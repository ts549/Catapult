import os
from flask import Flask, flash, request, redirect, url_for
from werkzeug.utils import secure_filename
from video import video_to_audio, parse_video

app = Flask(__name__)

# Example function
@app.route('/', methods=['GET'])
def test():
    return {'status' : '200'}

if __name__ == '__main__':
    app.run(host='::1', debug=True)
    

UPLOAD_FOLDER = '/videos'
ALLOWED_EXTENSIONS = {'mp4', 'mov'}

app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER



def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route('/upload', methods=['POST'])
def upload_file():
    # check if the post request has the file part
    if 'file' not in request.files:
        flash('No file part')
        return redirect(request.url)
    
    file = request.files['file']
    # if user does not select file, browser also
    
    # submit an empty part without filename
    if file.filename == '':
        flash('No selected file')
        return redirect(request.url)
    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
        return redirect(url_for('uploaded_file', filename=filename))
    
    return ""
