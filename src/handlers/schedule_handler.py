from PyPDF2 import PdfReader
from openai import OpenAI
import os 

class ScheduleHandler:
  def __init__(self, file_path):
    self.file_path = file_path

  def handle_pdf_content(self):
    reader = PdfReader(self.file_path)
    page = reader.pages[0]
    content = page.extract_text()
    return content

  def set_gpt_connection():
    client = OpenAI(
      api_key=os.environ.get('OPENAI_API_KEY')
    )

    return client

  def generate_schedule(self):
    names = [
      'Matheus',
      'Wilton',
      'João',
      'Caio',
      'Rillary',
      'Cadu',
      'Diana',
      'Ana Laura',
      'Emanuelly',
      'Carlos Henrique',
      'Lourdes',
      'Valentina',
      'Nichollas',
      'Laura'
    ]

    schedule_template = """
      Escala do mês {nome do mês que esta no conteúdo do arquivo} (utilize CAPS LOCK)

      - {dia do mês} ({horário da missa}) 
        - Nome 1
        - Nome 2
        ... 
    """

    file_content = self.handle_pdf_content()

    openai = self.set_gpt_connection()

    chat_completion = openai.chat.completions.create(
      messages=[
        {"role": "user", "content": "Se comporte como um coordenador da comunidade São José que deve mexer em uma escala de missas e/ou compromissos do mês. Você deve organizar, em uma lista, servidores que devem ir à comunidade nos dias de missa."},
        {"role": "user", "content": f"A lista deve ser montada com os seguintes nomes, alías, APENAS estes nomes e nada mais a acrescentar: { names }"},
        {"role": "user", "content": f"Dados os nomes, a escala deve manter o seguinte modelo com, NO MÁXIMO, 5 nomes por dia de missa: { schedule_template }"},
        {"role": "user", "content": f"Dadas as instruções, segue o conteúdo do arquivo em que você vai se basear: { file_content }"},
      ],
      model="gpt-3.5-turbo"
    )

    return chat_completion

    # print(chat_completion)