#!/usr/bin/env bash
(cd frontend && npm install)
(cd backend && go mod tidy)