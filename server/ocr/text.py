#local ver
from google.cloud import vision
from flask import abort, make_response, jsonify
import base64
import requests
import json


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