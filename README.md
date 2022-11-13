# CHAPP

CHAPP is a fullstack web application for room like text chatting

- Backend is developed in Go (version 1.19.2)
- Frontend is developed in Angular (version 14.2.8)
- Chat realtime communication is built on the websocket protocol

# How to install the dependencies?

`npm install` and `go mod tidy` are wrapped by the `install.sh` command

```sh
./install.sh
#or
bash install.sh
```

# How to run?

Currently the only way to launch the application is in development mode

Use the `dev.sh` script to accomplish it

```sh
./dev.sh
#or
bash dev.sh
```

The script can be interrupted to end the application lifecycle