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
    # return content

    with open('utils/schedule.txt', 'w') as file:
      file.write(content)
  
  # def set_prompt(self):
  #   names = ['Matheus', 'Wilton', 'João', 'Caio', 'Rillary', 'Cadu', 'Diana', 'Ana Laura', 'Emanuelly', 'Carlos Henrique', 'Lourdes', 'Valentina', 'Nichollas', 'Laura']

  #   schedule_template = """
  #     Escala do mês da comunidade São José {nome do mês que esta no conteúdo do arquivo} (utilize CAPS LOCK)

  #     - {nome do dia do mês} ({horário da missa}) 
  #       - Nome 1
  #       - Nome 2
  #       ... 
  #   """

  #   file_content = self.handle_pdf_content()

  #   chat_prompt = [
  #     {"role": "user", "content": "Se comporte como alguém responsável por montar uma escala de servidores APENAS da comunidade São José."},
  #     {"role": "user", "content": "Veja que no conteúdo, segue-se a ordem de dia (número), dia (por extenso), horário da missa, os locais (comunidades), e o padre."},
  #     {"role": "user", "content": f"Com esse conteúdo, você vai localizar a comunidade São José APENAS, e seus horários e datas, e montar uma lista nesse molde: { schedule_template }, com os seguintes nomes: { names }. Lembre-se de colocar, NO MÁXIMO, 5 nomes por dia."},
  #     {"role": "user", "content": "Lembre-se que todos os nomes devem ser usados, e há alguns que precisam ir em dias específicos, como o Matheus, João, Caio, Rillary, e Wilton."},
  #     {"role": "user", "content": "O Matheus e João devem estar aos sábados apenas. Caio e Rillary podem estar as quartas e sábados, mas não os dois no mesmo dia."},
  #     {"role": "user", "content": "Lourdes, Valentina e Ana Laura podem estar nas quartas também."},
  #     {"role": "user", "content": f"Dadas todas as instruções, o conteúdo em que você vai se basear exclusivamente é: { file_content }"},
  #   ]

  #   return chat_prompt

  # def on_generate_schedule(self):
  #   openai = OpenAI(
  #     api_key=os.environ.get('OPENAI_API_KEY')
  #   )

  #   prompt = self.set_prompt()

  #   chat_completion = openai.chat.completions.create(
  #     messages=prompt,
  #     model="gpt-3.5-turbo"
  #   )

  #   response = chat_completion.choices[0].message.content

  #   # print(response)

  #   with open('files/schedule.txt', 'w') as file:
  #     file.write(response)