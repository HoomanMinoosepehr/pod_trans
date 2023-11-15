#!/bin/bash
set -e

rm -f /tmp/pids/server.pid

bundle exec rails db:migrate || bundle exec rails db:create db:migrate db:seed

bundle exec rails s -p '3030' -b 'back'

exec "$@"