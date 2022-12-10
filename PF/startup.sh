BACKEND_DIR="$(pwd)/PB/csc309-tfc-pb"
FRONTEND_DIR="$(pwd)/PF/notus-nextjs-1.1.0"

sudo apt install python3 python3-pip python3-venv npm

# initialize the virtual environment
python3 -m venv env
source env/bin/activate
pip3 install Django
python3 -m pip install -r $BACKEND_DIR/requirements.txt --force-reinstall

# remove old database
find . -path "*/migrations/*.py" -not -name "__init__.py" -delete 
find . -path "*/migrations/*.pyc"  -delete
find . -path "*/db.sqlite3"  -delete

# initialize the database
python3 $BACKEND_DIR/manage.py makemigrations
python3 $BACKEND_DIR/manage.py migrate

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

