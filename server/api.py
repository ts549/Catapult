import os
from flask import Flask, flash, request, redirect, url_for, jsonify, make_response 
from werkzeug.exceptions import BadRequest
from video import split_video_audio, transcribe_audio, save_file
import sys
from flask_cors import CORS



app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})


# Example function
@app.route('/', methods=['GET'])
def test():
    return make_response(jsonify({'status' : '200'}), 200)

@app.route('/upload', methods=['POST'])
def upload_file():
    file_path = save_file(request)
    print("DONE SAVING")
    audio_path = split_video_audio(file_path)
    print("DONE SPLITTING")
    transcription = transcribe_audio(audio_path)
    print("DONE TRANSCRIBING")
    
    data = {'status': 'Success', 'message': 'File saved', 'video_path': file_path, "audio_path": audio_path, "transcription": transcription }
    
    return make_response(jsonify(data), 200)


if __name__ == '__main__':
    app.run(host='::1', debug=True)

