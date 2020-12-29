# this script is just to make a chart
import json
import matplotlib.pyplot as plt
import os

dirname = os.path.dirname(__file__)
fileName1 = os.path.join(dirname, 'data.json')

with open(fileName1, 'r') as myfile:
    data = myfile.read()
treatedData = json.loads(data)

fileName2 = os.path.join(dirname, 'dataDerivative.json')

with open(fileName2, 'r') as myfile:
    data = myfile.read()
derivativeData = json.loads(data)

fileName3 = os.path.join(dirname, 'peakList.json')

with open(fileName3, 'r') as myfile:
    data = myfile.read()
peakList = json.loads(data)

x = treatedData['x']

fig, ax1 = plt.subplots()

color = 'tab:red'
ax1.set_xlabel('temperature')
ax1.set_ylabel('weight', color=color)
ax1.plot(x, treatedData['y'], color=color)
ax1.tick_params(axis='y', labelcolor=color)

ax2 = ax1.twinx()  # instantiate a second axes that shares the same x-axis

color = 'tab:blue'
# we already handled the x-label with ax1
ax2.set_ylabel('derivative', color=color)
ax2.plot(derivativeData['x'], derivativeData['y'], color=color)
ax2.tick_params(axis='y', labelcolor=color)


# 2nd derivative

fileName4 = os.path.join(dirname, 'dataDerivative2.json')

with open(fileName4, 'r') as myfile:
    data = myfile.read()
derivativeData2 = json.loads(data)


ax3 = ax2.twinx()  # instantiate a second axes that shares the same x-axis

color = 'tab:green'
# we already handled the x-label with ax1
ax3.set_ylabel('derivative2', color=color)
ax3.plot(derivativeData2['x'], derivativeData2['y'], color=color)
ax3.tick_params(axis='y', labelcolor=color)


ax4 = ax3.twinx()

color = 'tab:red'
# we already handled the x-label with ax1
ax4.scatter(peakList['x'], peakList['y'], color=color)
ax4.tick_params(axis='y', labelcolor=color)

# end 2nd derivative

fig.tight_layout()  # otherwise the right y-label is slightly clipped
plt.show()
