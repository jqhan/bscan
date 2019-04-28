import os
import sys
import subprocess
import json
from datetime import datetime
import requests
import time


# Tries to read config file.
# If it can't find one, return a default config based on c-compilation
def read_config():
    try:
        file = open("bscan_config.json", 'r')
        if file.mode != 'r':
            return config
        return json.loads(file.read())
    except:
        print("Did not find any config file, using default")
        return {
            "api_endpoint": "http://localhost:8989/api/buildLog/add",
            "env-variables": [
                "CC"
            ],
            "versions": [
                "gcc",
            ],
            "dependency-commands": [
                "gcc -M ../sample_programs/*.c"
            ]
        }

#perform POST request with build data to the server
def post_results(results, API_ENDPOINT):

    post_request = {
        "id": "",
        "date": str(datetime.now()).split('.')[0].replace(' ', '-'),
        "user": results["user"],
        "env": results["env"],
        "dependencies": results["dependencies"],
        "command": results["command"],
        "succeeded": results["succeeded"],
        "output": results["output"],
        "time": results["time"]
    }

    json_obj = json.loads(json.dumps(post_request))

    r = requests.post(url=API_ENDPOINT, json=json_obj, headers={
        "content-type": "application/json"})
    return r

# Extract environment variables
def extract_environment_vars(environment_vars):
    vars = []
    for x in environment_vars:
        if x in os.environ:
            vars.append({x: str(os.environ[x])})
        else:
            vars.append({x: "NOT DECLARED"})

    return vars

# Run all of the commands defined in the config and passed to the build wrapper
def run_commands(command, config):
    results = {
        "time": -1,
        "command": (' ').join(command).strip(),
        "succeeded": False,
        "output": "",
        "user": "",
        "env": [],
        "dependencies": []
    }
    start = time.time()
    output = subprocess.run(command, stdout=subprocess.PIPE, shell=True,
                            stderr=subprocess.PIPE, universal_newlines=True)
    end = time.time()

    results["time"] = round(end-start, 4)

    if output.returncode == 0:
        print(output.stdout)
        results["output"] = str(output.stdout)
        results["succeeded"] = True
    else:
        results["output"] = str(output.stderr)
        results["succeeded"] = False
        print(output.stderr)

    whoami = subprocess.run('whoami', stdout=subprocess.PIPE, shell=True,
                            stderr=subprocess.PIPE, universal_newlines=True)
    if whoami.returncode == 0:
        results["user"] = str(whoami.stdout[:-1])

    if "versions" in config:
        for x in config["versions"]:
            version = subprocess.run(x + ' --version', shell=True, stdout=subprocess.PIPE,
                                     stderr=subprocess.PIPE, universal_newlines=True)
            if version.returncode == 0:
                results["env"].append(
                    {x + "-version": str(version.stdout).split('\n', 1)[0]})
            else:
                results["env"].append(
                    {x + "-version": str(version.stderr).split('\n', 1)[0]})

    if "dependency-commands" in config:
        for x in config["dependency-commands"]:
            dep = subprocess.run(x, shell=True, stdout=subprocess.PIPE,
                                 stderr=subprocess.PIPE, universal_newlines=True)
            if dep.returncode == 0:
                results["dependencies"].append(
                    {x: str(dep.stdout)})
            else:
                results["dependencies"].append(
                    {x: str(dep.stderr)})

    return results

# entrypoint method for the build wrapper
def run():
    config = read_config()
    if "env-variables" in config:
        environment_vars = config["env-variables"]
    else: 
        environment_vars = []

    command = sys.argv
    command.pop(0)

    # run the commands
    results = run_commands(command, config)

    env_vars = extract_environment_vars(environment_vars)
    results["env"].extend(env_vars)

    if "api_endpoint" in config:
        r = post_results(results, config["api_endpoint"])
    else:
        print("WARNING: no api endpoint provided")
        print("tries with default endpoint: http://localhost:8989/api/buildLog/add")
        r = post_results(results, "http://localhost:8989/api/buildLog/add")

    if r.status_code == 200:
        print("------------------------------------Build wrapper------------------------------------")
        print("Server responded: " + str(r.status_code))
        print("log has been pushed!")
        print("url to your build log: " + json.loads(r.content)['url'])
        print("-------------------------------------------------------------------------------------")
    else:
        print("------------------------------------Build wrapper------------------------------------")
        print("Server responded: " + str(r.status_code))
        print("ERROR")
        print("message: " + str(r.content))
        print("-------------------------------------------------------------------------------------")
