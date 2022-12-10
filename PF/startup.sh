BACKEND_DIR=$(pwd)/PB/csc309-tfc-pb

# initialize the virtual environment
# python3 -m venv env
# source env/bin/activate
# python3 -m pip install -r $BACKEND_DIR/requirements.txt --force-reinstall

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
python3 $BACKEND_DIR/manage.py loaddata ./studios.json
