import json


import json

f = open('./tagsFolder/tags.json')
data = json.load(f)
data = data["result"]
data = data["tags"]
tagList = []
for i in range(0, 5):
    tagList.append(data[i]["tag"]["en"])

print(', '.join(tagList), end='')
f.close()
