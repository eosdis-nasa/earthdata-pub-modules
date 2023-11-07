## Purpose of this directory

Although this directory is empty within the git repo, it
is required when deploying locally to avoid the following
error:
```
Traceback (most recent call last):
  File "deploy.py", line 105, in <module>
    main()
  File "deploy.py", line 80, in main
    create_files_from_templates(template_paths[i], node_install_paths[i])
  File "deploy.py", line 67, in create_files_from_templates
    with open(final_path, "w") as f:
FileNotFoundError: [Errno 2] No such file or directory: 'config/docker-compose.production.yml'
```

During local deployment, this directory will generate
the correct file contents from the env.json and
templates directory files.