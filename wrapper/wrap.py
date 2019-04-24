import os
import sys
import subprocess
import json


environment_vars = ['CC', 'PATH']
versions_vars = ['gcc']
command = sys.argv
command.pop(0)
print(command)
MyOut = subprocess.Popen(command, 
            stdout=subprocess.PIPE, 
            stderr=subprocess.STDOUT)
stdout,stderr = MyOut.communicate()
print(stdout)
#print(stderr)
print("This is the name of the script: ", sys.argv[0])
print("Number of arguments: ", len(sys.argv))
print("The arguments are: " , str(sys.argv))
#json_obj = json.loads(os.environ['CC'])
#print(json.dumps(json_obj))
