#!/usr/bin/env bash
wire ./app
go build -o backend.exe
./backend.exe