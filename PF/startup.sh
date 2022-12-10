#!/bin/bash

BACKEND_DIR="$(pwd)/PB/csc309-tfc-pb"
FRONTEND_DIR="$(pwd)/PF/notus-nextjs-1.1.0"

sudo apt update
sudo apt install -y python3 python3-pip python3-venv npm

# remove old database
find . -path "*/migrations/*.py" -not -name "__init__.py" -delete 
find . -path "*/migrations/*.pyc"  -delete
find . -path "*/db.sqlite3"  -delete

# initialize the database
./$BACKEND_DIR/startup.sh

# create admin:admin
DJANGO_SUPERUSER_PASSWORD=admin \
DJANGO_SUPERUSER_USERNAME=admin \
DJANGO_SUPERUSER_EMAIL=admin@nonexist.com \
$BACKEND_DIR/manage.py createsuperuser \
--no-input

# populate the database
python3 $BACKEND_DIR/manage.py loaddata $BACKEND_DIR/startup/management/commands/data/studio.json
python3 $BACKEND_DIR/manage.py popdb

# install npm packages
npm i --prefix $FRONTEND_DIR --legacy-peer-deps
