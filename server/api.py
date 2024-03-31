import os
from flask import Flask, request, jsonify, make_response 
from video import split_video_audio, transcribe_audio, save_file
from gpt import create_quiz
from flask_cors import CORS
from extract_text import build_transcript

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})


# Example function
@app.route('/', methods=['GET'])
def test():
    return make_response(jsonify({'status' : '200'}), 200)

@app.route('/upload', methods=['POST'])
def upload_file():
    file = save_file(request)
    print("DONE SAVING")
    audio_path = split_video_audio(file['path'])
    print("DONE SPLITTING")
    transcription = transcribe_audio(audio_path)
    print("DONE TRANSCRIBING")
    video_transcription = build_transcript(file)
    parts = file['path'].split('/')
    id = parts[2]
    questions = create_quiz(transcription, video_transcription, request.form["multiple_choice"], request.form["true_false"], request.form["short_answer"], request.form["variations"])
    print("DONE QUESTIONS")
    data = {'id': id, 'status': 'Success', 'message': 'File saved', 'video_path': file, "audio_path": audio_path, "transcription": transcription, "questions": questions}
    return make_response(jsonify(data), 200)


if __name__ == '__main__':
    app.run(host='::1', debug=True)

