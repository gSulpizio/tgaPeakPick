# this script is just to make a chart
import json
import matplotlib.pyplot as plt
print(
    'input file names without extentions. File has to be .json with two arrays x and y in an object: {{x:[1,2,3],y:[4,5,6]}}\n')
file1 = input('name file 1:\n')


with open('/home/giustinosulpizio/git/Cheminfo/tgaPeakPick/example/'+file1+'.json', 'r') as myfile:
    data = myfile.read()
data1 = json.loads(data)


x = data1['x']

fig, ax1 = plt.subplots()

color = 'tab:blue'
ax1.set_xlabel('temperature')
ax1.set_ylabel('weight', color=color)
ax1.plot(x, data1['y'], color=color)
ax1.tick_params(axis='y', labelcolor=color)

plt.show()
