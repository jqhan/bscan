
import os
import sys
import subprocess
import json
from datetime import datetime
import requests
import time

API_ENDPOINT = "http://localhost:8989/api/buildLog/add"
environment_vars = ['CC']
versions_vars = ['react', 'g++']


command = sys.argv
command.pop(0)

# run the command
start = time.time()
output = subprocess.run(command, stdout=subprocess.PIPE, shell=True,
                        stderr=subprocess.PIPE, universal_newlines=True)
end = time.time()

# run whoami
whoami = subprocess.run('whoami', stdout=subprocess.PIPE, shell=True,
                        stderr=subprocess.PIPE, universal_newlines=True)

post_request = {"id": "", "date": "", "user": "",
                "env": [], "command": "", "output": "", "time": round(end-start, 4)}

# populate the post request
for x in environment_vars:
    if x in os.environ:
        post_request["env"].append({x: str(os.environ[x])})

for x in versions_vars:
    version = subprocess.run(x + ' --version', shell=True, stdout=subprocess.PIPE,
                             stderr=subprocess.PIPE, universal_newlines=True)
    if version.returncode == 0:
        post_request["env"].append(
            {x + "-version": str(version.stdout).split('\n', 1)[0]})
    else:
        post_request["env"].append(
            {x + "-version": str(version.stderr).split('\n', 1)[0]})
post_request["date"] = str(datetime.now()).split('.')[0].replace(' ', '-')


if whoami.returncode == 0:
    post_request["user"] = str(whoami.stdout[:-1])

if output.returncode == 0:
    print(output.stdout)
    post_request["output"] = str(output.stdout)
else:
    post_request["output"] = str(output.stderr)
    print(output.stderr)

command_str = ''
for com in command:
    command_str = command_str + " " + com
post_request["command"] = command_str[1:]

json_obj = json.loads(json.dumps(post_request))
#print(post_request)
r = requests.post(url=API_ENDPOINT, json=json_obj, headers={
                  "content-type": "application/json"})
print(r.status_code)

if r.status_code == 200:
    print("------------------------------------Build wrapper------------------------------------")
    print("log has been pushed!")
    print("url to your build log: " + json.loads(r.content)['url'])
    print("-------------------------------------------------------------------------------------")
else:
    print("------------------------------------Build wrapper------------------------------------")
    print("ERROR")
    print("message: " + str(r.content))
    print("-------------------------------------------------------------------------------------")



