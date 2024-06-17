from PyPDF2 import PdfReader
from flask import Blueprint, request, jsonify

upload_blueprint = Blueprint('ai_completion', __name__)

@upload_blueprint.route('/upload', methods=['POST'])
def handleUpload():
    if 'file' not in request.files:
        return jsonify({'error': 'File not found...'}), 400

    file = request.files['file']

    if file and file.filename.endswith('.pdf'):
        reader = PdfReader(file)
        number_of_pages = len(reader.pages)
        content = ""

        for i in range(number_of_pages):
            page = reader.pages[i]
            extracted = page.extract_text()
            content += extracted

        return jsonify({'message': 'Content extracted.', 'content': content}), 200
    else:
        return jsonify({'error': 'Format not accepted. PDF only...'}), 400
