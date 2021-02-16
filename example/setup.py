# to install all the required python packages, this script has to be run once before being able to run the python scripts.
# Python and pip have to be installed.
# install for python:https://www.python.org/downloads/
# install for pip:https://pip.pypa.io/en/stable/installing/ || for UNIX/macOS: 'python get-pip.py'

# to update dependencies:
# 'pipreqs . --force' in terminal

import os
import subprocess

dirname = os.path.dirname(__file__)
path = os.path.join(dirname, 'requirements.txt')

command1 = ['pip', 'install', '-r', path]
command2 = ['pip3', 'install', '-r', path]

try:
    output = subprocess.Popen(
        command1, stdout=subprocess.PIPE).communicate()[0]
except OSError:
    try:
        output = subprocess.Popen(
            command2, stdout=subprocess.PIPE).communicate()[0]
    except OSError:
        print('pip not installed. If pip is installed, then go to the directory where requirements.txt is located and execute the following command:\n\npip install -r\n\nor:\n\npip3 install -r\n')
