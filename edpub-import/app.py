#!/usr/bin/env python3
from flask import Flask, request, jsonify
import json
import time
import os
import logging, logging.config
from werkzeug.serving import WSGIRequestHandler
import socket
import configparser
from urllib3.connection import HTTPConnection

from scripts.insert_edpub_json import *

app = Flask(__name__)
uuid_list = {}

@app.route('/edpub-import/<uuid>', methods=['GET', 'POST'])
def add_message(uuid):
    timestamp = round(time.time()*1000)
    content = request.json
    remote_id = request.remote_addr
    #print(content)
    if uuid in uuid_list.values():
        key_id = list(uuid_list.keys())[list(uuid_list.values()).index(uuid)]
        filename = '/import/' + str(timestamp) + ".json"
        with open(filename, 'w') as f:
            json.dump(content, f, ensure_ascii=False)
        #while not os.path.exists(filename):
         #   time.sleep(1)
        try:
            insert_data(filename)
            LOGGER.info('"uuid":%s, "timestamp":%s, "status":"Import Successful", %s, %s', uuid, timestamp, key_id, remote_id)
            return jsonify({"uuid":uuid, "timestamp":timestamp, "status":"Import Successful"})
        except Exception as error:
            LOGGER.info('"uuid":%s, "timestamp":%s, "status":"Import Failed", %s, %s', uuid, timestamp, key_id, remote_id)
            LOGGER.error(error)
            return jsonify({"uuid":uuid, "timestamp":timestamp, "status":"Import Failed"})
        
            
        #return jsonify({"uuid":uuid, "timestamp":timestamp})
    else:
        LOGGER.info('Invalid key from remote: %s', remote_id)
        return '', 300

if __name__ == '__main__':

    #import config
    GLOBAL_CONFIG_PATH = '/usr/local/scripts/lib/'
    if GLOBAL_CONFIG_PATH not in os.sys.path:
        os.sys.path.append(GLOBAL_CONFIG_PATH)

    config = configparser.ConfigParser()
    config.read(f'{GLOBAL_CONFIG_PATH}edpub-config.ini')
    print(config.sections())

    uuid_list_items = config.items('uuid_list')
    #for item_key in uuid_list_items:
        #print(item_key[1])
       # uuid_list.append(item_key)
    uuid_list = dict(config.items('uuid_list'))
    print('uuid_list = ', uuid_list)
    
    #https stuff!
    keyfile = os.environ.get("keyfile")
    certfile = os.environ.get("certfile")
    context = (certfile, keyfile)

    #Added to add some reliability to connections - may or may not actually be useful
    WSGIRequestHandler.protocol_version = "HTTP/1.1"
    HTTPConnection.default_socket_options = (
        HTTPConnection.default_socket_options + [
            (socket.SOL_SOCKET, socket.SO_KEEPALIVE, 1),
            (socket.SOL_TCP, socket.TCP_KEEPIDLE, 45),
            (socket.SOL_TCP, socket.TCP_KEEPINTVL, 10),
            (socket.SOL_TCP, socket.TCP_KEEPCNT, 6)
        ]
    )

    #Setup logging


    logging.config.fileConfig(f'{GLOBAL_CONFIG_PATH}edpub-import-logging.ini', disable_existing_loggers=False)
    LOGGER = logging.getLogger()
    LOGGER.info('Api log inititializing.')

    app.run(host= '0.0.0.0', port=5009 ,debug=False, ssl_context=context)