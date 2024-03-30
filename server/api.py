import os
from flask import Flask, flash, request, redirect, url_for
from werkzeug.exceptions import BadRequest
from video import split_video_audio, transcribe_audio, save_file
import sys



app = Flask(__name__)

# Example function
@app.route('/', methods=['GET'])
def test():
    return {'status' : '200'}

if __name__ == '__main__':
    app.run(host='::1', debug=True)


app = Flask(__name__)


@app.route('/upload', methods=['POST'])
def upload_file():
    file_path = save_file(request)
    audio_path = split_video_audio(file_path)
    transcription = transcribe_audio(audio_path)
    return {'status': 'Success', 'message': 'File saved', 'video_path': file_path, "audio_path": audio_path, "transcription": transcription }