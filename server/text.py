from google.cloud import vision
from flask import abort, make_response, jsonify

def detect_text(path):
    client = vision.ImageAnnotatorClient()

    with open(path, "rb") as image_file:
        content = image_file.read()

    image = vision.Image(content=content)

    response = client.text_detection(image=image)
    texts = response.text_annotations
    for text in texts:
        return texts
    if response.error.message:
        abort(make_response(jsonify(message="OCR failed"), 400))