from flask import Flask
from routes.upload_route import upload_blueprint
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
app.config['MAX_CONTENT_LENGTH'] = 50 * 1024 * 1024

app.register_blueprint(upload_blueprint)

if __name__ == '__main__':
  app.run(debug=True) # default port=5000