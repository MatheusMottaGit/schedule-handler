from PyPDF2 import PdfReader
from openai import OpenAI
from datetime import datetime
import calendar
import os 

class ScheduleHandler:
  def __init__(self, file_path):
    self.file_path = file_path

  def handle_pdf_content(self):
    reader = PdfReader(self.file_path)

    number_of_pages = len(reader.pages)

    content = ""

    for i in range(number_of_pages):
      page = reader.pages[i]

      extracted = page.extract_text()
      
      content = content + extracted

    return content
  
  def handle_month_dates(self):
    today = datetime.today()

    current_month = today.month

    current_year = today.year

    num_of_days = calendar.monthrange(current_year, current_month)[1] # just number of days

    selected_days = [] # on first time, only wednesdays and saturdays
    
    for day in range(1, num_of_days):
      date = datetime(current_year, current_month, day)

      weekday = date.strftime('%A')

      if weekday == 'Wednesday' or weekday == 'Saturday':
        selected_days.append(day)
    
    return selected_days

  def handle_prompt(self):
    file_content = self.handle_pdf_content()

    required_dates = self.handle_month_dates()

    generating_rules = open('utils/rules.txt', 'r').read()

    exmpl = open('utils/resource.txt', 'r').read()

    chat_prompt = [
      {"role": "user", "content": f"Primeiro de tudo, formate esse conteúdo: { file_content }"},
      {"role": "user", "content": f"Depois, você deve separar TODOS os dias de missa da comunidade São José, apenas, que se encaixam nessas datas: { required_dates }"},
      {"role": "user", "content": f"Agora se baseie nessas regras para a confecção da escala: { generating_rules }."},
      {"role": "user", "content": f"Como exemplo, você pode se basear nesse modelo que você já fez em testes anteriores: { exmpl }."},
    ]

    return chat_prompt

  def handle_schedule_generating(self):
    openai = OpenAI(
      api_key=os.environ.get('OPENAI_API_KEY')
    )

    prompt = self.set_prompt()

    chat_completion = openai.chat.completions.create(
      messages=prompt,
      model="gpt-3.5-turbo"
    )

    response = chat_completion.choices[0].message.content

    with open('utils/schedule.txt', 'w') as file:
      file.write(response)