#!/usr/bin/env bash
(cd frontend && ng serve --host 0.0.0.0) &
(cd backend && bash run.sh) &
trap 'kill $(jobs -p)' EXIT
wait