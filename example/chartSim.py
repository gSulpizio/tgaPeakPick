# this script is just to make a chart
import json
import matplotlib.pyplot as plt


with open('/home/giustinosulpizio/git/Cheminfo/tgaPeakPick/example/dataSim.json', 'r') as myfile:
    data = myfile.read()
treatedData = json.loads(data)

with open('/home/giustinosulpizio/git/Cheminfo/tgaPeakPick/example/dataSimDerivative.json', 'r') as myfile:
    data = myfile.read()
derivativeData = json.loads(data)


x = treatedData['x']

fig, ax1 = plt.subplots()

color = 'tab:red'
ax1.set_xlabel('temperature')
ax1.set_ylabel('weight', color=color)
ax1.plot(x, treatedData['y'], color=color)
ax1.tick_params(axis='y', labelcolor=color)

plt.show()
