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
  
  def set_prompt(self):
    names = ['Matheus', 'Wilton', 'João', 'Caio', 'Rillary', 'Cadu', 'Diana', 'Ana Laura', 'Emanuelly', 'Carlos Henrique', 'Lourdes', 'Valentina', 'Nichollas', 'Laura']

    schedule_template = """
      Escala do mês da comunidade São José {nome do mês que esta no conteúdo do arquivo} (utilize CAPS LOCK)

      - {nome do dia do mês} ({horário da missa}) 
        - Nome 1
        - Nome 2
        ... 
    """

    file_content = self.handle_pdf_content()

    chat_prompt = [
      {"role": "user", "content": ""}
    ]

    return chat_prompt

  def on_generate_schedule(self):
    openai = OpenAI(
      api_key=os.environ.get('OPENAI_API_KEY')
    )

    prompt = self.set_prompt()

    chat_completion = openai.chat.completions.create(
      messages=[prompt],
      model="gpt-3.5-turbo"
    )

    response = chat_completion.choices[0].message.content

    # print(response)

    with open('files/schedule.txt', 'w') as file:
      file.write(response)