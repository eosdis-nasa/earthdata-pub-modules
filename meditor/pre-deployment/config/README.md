## Purpose of this directory

Although this directory is empty within the git repo, it
is required when deploying locally to avoid the following
error:
```
Traceback (most recent call last):
  File "generatetemplate.py", line 15, in <module>
    with open("config/pull_and_push.sh", "w") as f:
FileNotFoundError: [Errno 2] No such file or directory: 'config/pull_and_push.sh'
```

During local deployment, this directory will generate
the correct file contents from the env.json and
templates directory files.