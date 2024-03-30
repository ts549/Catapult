from flask import Flask

app = Flask(__name__)

# Example function
@app.route('/', methods=['GET'])
def test():
    return {'status' : '200'}

if __name__ == '__main__':
    app.run(host='::1', debug=True)