import cv2
import os
import shutil


FRAMES_SKIPPED = 50

def capture_frames(video_path):
    frame_count = 0
    frame_paths = []
    frame = cv2.VideoCapture(video_path)
    status, image =frame.read()

    try: 
        
        # creating a folder named data 
        if not os.path.exists('data'): 
            os.makedirs('data') 

        # if not created then raise error 
    except OSError: 
        print ('Error: Creating directory of data') 
        
    while status: #continue making frames while video is still left
        status, image = frame.read()
        if frame_count % FRAMES_SKIPPED == 0:
            new_path = './data/frame' + str(frame_count) + '.png'
            cv2.imwrite(new_path, image)       
            frame_paths.append(new_path)     
        frame_count +=1

        
        '''
        1. recheck status
        2. check frame count
        3. if correct frame count --> save the image and add the path to frame paths'''
    '''If success is true --> update frame count
    check frame count--> we only want every 30-60 frames
    if its the frame we want --> store the image
    '''
    frame.release() 
    cv2.destroyAllWindows() 
    return frame_paths


def extract_text(existing_text, photo_path):
    new_frame_text = ""
    
    #screenshot = cv2.

    #return frame_text

    pass

def build_transcript(video_path):
    image_to_text = ""
    all_image_paths = capture_frames(video_path)
    for image_path in all_image_paths:
        image_to_text = extract_text(image_to_text, image_path)


    #img_paths, img_count = capture_frames(video_path)
   # return image_to_text
    shutil.rmtree('./data')

    pass
#initialize string to store all printed text/handwriting from lecture video

''''
Now with collection of images:
for loop through folder --> pass each image to extract text
if new text is in image_to_text --> dont add it to the new string 


delete all images
return large string
'''

if __name__ == "__main__":
    capture_frames('./test_lecture_vid.mov')
    shutil.rmtree('./data')