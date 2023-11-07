from flask import Flask, request
import base64
import cv2
import numpy as np

app = Flask(__name__)

@app.route('/frame', methods=['POST'])
def frame():
    data = request.json['image']
    data = data.split(',')[1]
    data = base64.b64decode(data)
    data = np.fromstring(data, dtype=np.uint8)
    frame = cv2.imdecode(data, cv2.IMREAD_COLOR)
    # Process frame here
    return '', 204

if __name__ == '__main__':
    app.run()
