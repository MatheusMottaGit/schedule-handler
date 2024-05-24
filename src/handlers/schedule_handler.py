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
      Escala do mês da comunidade São José {nome do mês que esta no conteúdo do arquivo} (utilize CAPS LOCK)

      - {dia do mês} ({horário da missa}) 
        - Nome 1
        - Nome 2
        ... 
    """

    file_content = self.handle_pdf_content()

    openai = OpenAI(
      api_key=os.environ.get('OPENAI_API_KEY')
    )

    chat_completion = openai.chat.completions.create(
      messages=[
        {"role": "user", "content": "Se comporte como um coordenador da comunidade **São José** que deve mexer em uma escala de missas e/ou compromissos do mês. Você deve organizar, em uma lista APENAS DA COMUNIDADE SÃO JOSÉ, servidores que devem ir nos dias de missa."},
        {"role": "user", "content": "Analise o conteúdo, e separe os dias APENAS DA COMUNIDADE SÃO JOSÉ, e nenhuma comunidade mais."},
        {"role": "user", "content": f"A lista deve ser montada com os seguintes nomes, aliás, APENAS estes nomes e nada mais a acrescentar: { names }"},
        {"role": "user", "content": f"O Matheus DEVE estar em todos os sábados APENAS, e o Caio e Rillary podem estar nas quartas-feiras. A Valentina pode estar tanto nos sábados, quanto nas quartas."},
        {"role": "user", "content": f"Dados os nomes, a escala deve manter o seguinte modelo com, NO MÁXIMO, 5 nomes por dia de missa: { schedule_template }"},
        {"role": "user", "content": f"Dadas as instruções, as quais devem ser seguidas à risco, segue o conteúdo do arquivo em que você vai se basear: { file_content }"},
      ],
      model="gpt-3.5-turbo"
    )

    response = chat_completion.choices[0].message.content

    print(response)

    with open('schedule.txt', 'w') as file:
      file.write(response)