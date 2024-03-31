import cv2
import os
import shutil
import base64
from text import detect_text

FRAMES_SKIPPED = 120

def encode_frame(frame):
    _, buffer = cv2.imencode('.jpg', frame)
    base64_encoded = base64.b64encode(buffer) #.decode('utf-8')
    return base64_encoded


def capture_frames(video_path):
    frame_count = 0
    frame_bytes = []
    frame = cv2.VideoCapture(video_path)
    status, image = frame.read()
        
    while status: #continue making frames while video is still left
        status, image = frame.read()
        if frame_count % FRAMES_SKIPPED == 0:
            frame_bytes.append(encode_frame(image))     
        frame_count +=1
    frame.release() 
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

def build_transcript(video_path):
    image_to_text = ""
    all_image_bytes = capture_frames(video_path)
    for image_byte in all_image_bytes:
        image_to_text = extract_text(image_to_text, image_byte)

    print(image_to_text)
    return image_to_text

''''
Now with collection of images:
for loop through folder --> pass each image to extract text
if new text is in image_to_text --> dont add it to the new string 

return large string
'''

if __name__ == "__main__":
    build_transcript('./test_lecture_vid.mov')
