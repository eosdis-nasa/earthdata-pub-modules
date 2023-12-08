FROM python:3.6-slim-buster

LABEL maintainer="ORNL DAAC"

COPY ./requirements.txt /

WORKDIR /usr/local/scripts/lib/

COPY config/* /usr/local/scripts/lib/

WORKDIR /

RUN pip3 install --upgrade pip
RUN pip3 install -r requirements.txt

COPY *.py /
COPY scripts /scripts
COPY keys /keys

EXPOSE 5009

ENTRYPOINT [ "python3" ]

CMD [ "app.py" ]