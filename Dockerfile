FROM python:3.9.19-alpine3.20

WORKDIR /app

COPY requirements.txt /app/requirements.txt

COPY . .

RUN pip install -r requirements.txt

CMD ["python", "src/main.py"]
