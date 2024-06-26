import whisper
from moviepy.editor import VideoFileClip
from werkzeug.utils import secure_filename
from flask import abort, make_response, jsonify
import os
import uuid
import cv2


model = whisper.load_model("base")

def generate_frames(input_file):
  dir_path = os.path.dirname(input_file)
  video = cv2.VideoCapture

  fps = int(video.get(cv2.CAP_PROP_FPS))

  success, image = video.read()
  count = 0

  while success:
    if count % fps == 0:
      cv2.imwrite(f"{dir_path}\frame{count//fps}.jpg", image)
    success, image = video.read()
    count += 1
  video.release()

def split_video_audio(input_file):
  video = VideoFileClip(input_file)
  dir_path = os.path.dirname(input_file)
  audio_path = os.path.join(dir_path, "audio.wav")
  video.audio.write_audiofile(audio_path)
  return audio_path
  
def transcribe_audio(input_file):
  result = model.transcribe(input_file)
  dir_path = os.path.dirname(input_file)
  transcription_path = os.path.join(dir_path, "transcription.txt")
  
  try:
    with open(transcription_path, 'w') as file:
      file.write(result["text"])
  except Exception as e:
    abort(make_response(jsonify(message="Couldn't transcribe text"), 400))

  return result["text"]



# VIDEO UPLOAD

UPLOAD_FOLDER = './videos'
VIDEO_EXTENSIONS = {'mp4', 'mov'}
PDF_EXTENSIONS = {'pdf'}
AUDIO_EXTENSIONS = {'mp3', 'wav'}


def allowed_file(filename):
    if '.' in filename:
       extension = filename.rsplit('.', 1)[1].lower()
       if extension in VIDEO_EXTENSIONS:
          return {"valid": True, "type": 'video'}
       elif extension in PDF_EXTENSIONS:
          return {"valid": True, "type": 'pdf'}
       elif extension in AUDIO_EXTENSIONS:
          return {'valid': True, 'type': 'audio'}
    return {'valid': False, 'type': ''}

def save_file(request):
    # check if the post request has the file part
    if 'file' not in request.files:
        abort(make_response(jsonify(message="No file part"), 400))

    file = request.files['file']
    # if user does not select file, browser also

    # submit an empty part without filename
    if file.filename == '':
        abort(make_response(jsonify(message="No selected file"), 400))

    file_valid = allowed_file(file.filename)
    if file and file_valid['valid']:
        myuuid = str(uuid.uuid4())
        given_filename = secure_filename(file.filename)
        filename = "video." + file.filename.rsplit('.', 1)[1].lower()
        
        path = os.path.join(UPLOAD_FOLDER, myuuid)
        
        # Create directory if it doesn't exist
        if not os.path.exists(path):
            os.makedirs(path)

        # Save the file
        file_path = os.path.join(path, filename)
        file.save(file_path)

        return {"path": file_path, "name": given_filename, "type": file_valid['type']}
    print(file_valid)
    abort(make_response(jsonify(message="Invalid file type"), 400))