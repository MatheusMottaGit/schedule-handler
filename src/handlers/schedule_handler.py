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
      
      content = content + extracted + "\n"

    # print(content)
    return content
  
  def handle_month_dates(self):
    today = datetime.today()

    current_month = today.month + 1 # testing as june

    current_year = today.year

    num_of_days = calendar.monthrange(current_year, current_month)[1] # just number of days

    selected_days = [] # on first time, only wednesdays and saturdays
    
    for day in range(1, num_of_days):
      date = datetime(current_year, current_month, day)

      weekday = date.strftime('%A')

      if weekday == 'Wednesday' or weekday == 'Saturday':
        selected_days.append(day)
    
    return selected_days

  def set_prompt(self):
    names = ['Matheus', 'Wilton', 'João', 'Caio', 'Rillary', 'Cadu', 'Diana', 'Ana Laura', 'Emanuelly', 'Carlos Henrique', 'Lourdes', 'Valentina', 'Nichollas', 'Laura']

    schedule_template = """
      Escala do mês da comunidade São José {nome do mês que esta no conteúdo do arquivo} (utilize CAPS LOCK)

      - {dia do mês}, {nome do dia do da semana} ({horário da missa}) 
        - Nome 1
        - Nome 2
        ... 
    """

    file_content = self.handle_pdf_content()

    required_mass_dates = self.handle_month_dates()

    chat_prompt = [
      {"role": "user", "content": f"Primeiro de tudo, formate esse conteúdo: { file_content }"},
      {"role": "user", "content": f"Depois, você deve separar TODOS os dias de missa da comunidade São José, apenas, que se encaixam nessas datas: { required_mass_dates }"},
      {"role": "user", "content": "Em seguida, com base nesses dias, você deve se comportar como o coordenador da comunidade, e montar uma escala com os servidores para os dias de missa."},
      {"role": "user", "content": f"Nessa escala, você deve seguir esse modelo: { schedule_template }, com os seguintes nomes { names }, colocando 5 nomes por dia."},
      {"role": "user", "content": "Priorize o seguinte: O Matheus, o João e a Laura, devem estar aos sábados, e o Wilton às quartas. Os demais podem ser mais distribuídos, mas tente não repetir a mesma pessoa em datas seguidas."},
      {"role": "user", "content": "E não deixe faltar nomes."},
    ]

    return chat_prompt

  def on_generate_schedule(self):
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