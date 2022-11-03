#!/usr/bin/env bash
(cd frontend && ng serve) &
(cd backend && bash run.sh) &
trap 'kill $(jobs -p)' EXIT
wait