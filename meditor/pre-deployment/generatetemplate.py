from jinja2 import Template
import json
import os

with open("templates/pull_and_push.j2") as f:
	template = f.read()

# print(template)
with open("images.json") as f:
    images = json.loads(f.read())
print(images)

j2_template = Template(template)

with open("config/pull_and_push.sh", "w") as f:
    f.write(j2_template.render(images))

os.system("chmod +x config/pull_and_push.sh")
os.system("bash config/pull_and_push.sh")