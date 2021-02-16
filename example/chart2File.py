# this script is just to make a chart
import json
import os
import matplotlib.pyplot as plt
print(
    'input file names without extentions. File has to be .json with two arrays x and y in an object: {{x:[1,2,3],y:[4,5,6]}}\n\n')

dirname = os.path.dirname(__file__)

file1 = input('name file 1:\n') or 'data'
filename1 = file1 + '.json'
path1 = os.path.join(dirname, filename1)

file2 = input('name file 1:\n') or 'data'
filename2 = file2 + '.json'
path2 = os.path.join(dirname, filename2)

with open(path1, 'r') as myfile:
    data = myfile.read()
data1 = json.loads(data)

with open(path2, 'r') as myfile:
    data = myfile.read()
data2 = json.loads(data)

fig, ax1 = plt.subplots()

color = 'tab:red'
ax1.set_xlabel('temperature')
ax1.set_ylabel('weight', color=color)
ax1.plot(data1['x'], data1['y'], color=color)
ax1.tick_params(axis='y', labelcolor=color)

ax2 = ax1.twinx()  # instantiate a second axes that shares the same x-axis

color = 'tab:blue'
# we already handled the x-label with ax1
ax2.set_ylabel('derivative', color=color)
ax2.plot(data2['x'], data2['y'], color=color)
ax2.tick_params(axis='y', labelcolor=color)

plt.show()
