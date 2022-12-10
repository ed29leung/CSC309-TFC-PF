#!/bin/bash

BACKEND_DIR="$(pwd)/PB/csc309-tfc-pb"
FRONTEND_DIR="$(pwd)/PF/notus-nextjs-1.1.0"

echo "UPDATING UBUNTU PACKAGES."
sudo apt update
sudo apt install -y python3 python3-pip python3-venv npm

echo "CLEARING ANY OLD FILES."
# remove old database
find . -path "*/migrations/*.py" -not -name "__init__.py" -delete 
find . -path "*/migrations/*.pyc"  -delete
find . -path "*/db.sqlite3"  -delete

# remove old env, if it exists
rm -rf env/

echo "CREATING BACKEND."
# initialize the database
python3.10 -m venv env
source env/bin/activate
python3 -m pip install -r $BACKEND_DIR/requirements.txt --force-reinstall
python3 $BACKEND_DIR/manage.py makemigrations
python3 $BACKEND_DIR/manage.py migrate

# create admin:admin
DJANGO_SUPERUSER_PASSWORD=admin \
DJANGO_SUPERUSER_USERNAME=admin \
DJANGO_SUPERUSER_EMAIL=admin@nonexist.com \
$BACKEND_DIR/manage.py createsuperuser \
--no-input

echo "POPULATING DATABASE."
# populate the database
python3 $BACKEND_DIR/manage.py loaddata $BACKEND_DIR/startup/management/commands/data/studio.json
python3 $BACKEND_DIR/manage.py popdb

echo "INSTALLING FRONTEND PACKAGES."
# install npm packages
npm i --prefix $FRONTEND_DIR --legacy-peer-deps
