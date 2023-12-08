#!/usr/bin/env python3
import requests
import json
import sys

port = '5009'
key = '276275AF-F71B-49A2-820F-3753B9697B46'
hostname = sys.argv[1]

f = open ("../metadata_examples/ummc_out_1st.json")
url = 'https://' + hostname + ':' + port + '/edpub-import/' + key;

jdata = json.load(f)

#verify=False to ignore self signed cert for localhost testing only. Remove for dev/prod use.
res = requests.post(url, json = jdata, verify=False)
if res.ok:
    print(res.json())
