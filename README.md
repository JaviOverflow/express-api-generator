# express-api-generator

In order to use it, you can add the following alias to your .bashrc or .bash_profile
```bash
alias apigen='nodejs <path/to/index.js>'
```

Generate '/projects' endpoint with all methods (POST, GET, UPDATE, DELETE) and its use cases
```bash
$ apigen --name projects --all
or
$ apigen --name projects -crud

$ apigen -n projects -crud
or
$ apigen --name projects -crud
```

Generate '/logs' endpoint with the following methods (GET, POST) and its use cases
```bash
$ apigen --name logs -cr
or
$ apigen -n logs -cr
```
