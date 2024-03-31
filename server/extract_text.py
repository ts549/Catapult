import cv2
import os
#import shutil
import base64
FRAMES_SKIPPED = 120

from google.cloud import vision
from flask import abort, make_response, jsonify
import pypdfium2 as pdfium
import numpy as np


def detect_text(byte_string):
    detected_text = ""
    client = vision.ImageAnnotatorClient()
    decoded_text = byte_string.decode('utf-8')

    image = vision.Image(content=decoded_text)
    response = client.text_detection(image=image)
    texts = response.text_annotations
    if response.error.message:
        abort(make_response(jsonify(message="OCR failed"), 400))
    if texts:
        detected_text = texts[0].description

    return(detected_text)

def encode_frame(frame):
    _, buffer = cv2.imencode('.jpg', frame)
    base64_encoded = base64.b64encode(buffer) #.decode('utf-8')
    return base64_encoded


def capture_frames(video_path):
    frame_count = 0
    frame_bytes = []
    cap = cv2.VideoCapture(video_path)
    status, image = cap.read()

    while status: #continue making frames while video is still left
        
        status, image = cap.read()
        if frame_count % FRAMES_SKIPPED == 0:
            frame_bytes.append(encode_frame(image))     
        frame_count +=1
    cap.release() 
    cv2.destroyAllWindows() 
    return frame_bytes

def extract_text(existing_text, photo_byte):
    new_frame_text = ""
    text = detect_text(photo_byte)
    if text not in new_frame_text:
        new_frame_text = existing_text + text
    else:
        new_frame_text = existing_text
    return new_frame_text 

def convertPDFtoBYTE(file_path):
    pdf = pdfium.PdfDocument(file_path)
    n_pages = len(pdf)
    image_bytes = []
    for page_number in range(n_pages):
        
        page = pdf.get_page(page_number)
        image = page.render(scale = 300/72).to_pil()
        image = np.array(image)
        
        image_bytes.append(encode_frame(image))
    return image_bytes

def build_transcript(file_path, file_type):
    image_to_text = ""
    all_image_bytes=[]
    if file_type == "video":
        all_image_bytes = capture_frames(file_path)
    elif file_type == "pdf":
        all_image_bytes = convertPDFtoBYTE(file_path)
    for image_byte in all_image_bytes:
        image_to_text = extract_text(image_to_text, image_byte)
    return image_to_text

''''
Now with collection of images:
for loop through folder --> pass each image to extract text
if new text is in image_to_text --> dont add it to the new string 

return large string
'''






if __name__ == "__main__":
    # Example usage
    #input_file = './ocr/test_lecture_vid.mov'
    # output_file = './processed_video.mov'
    # frame_interval = 60  # Select every 5th frame for processing

    # process_video(input_file, output_file, frame_interval)
    #build_transcript(input_file, "video")
    build_transcript('C:\\Users\\ruthf\\OneDrive - purdue.edu\\Documents\\ECE 2k2\\syllabus.pdf', "pdf")
