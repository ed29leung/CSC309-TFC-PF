BACKEND_DIR="$(pwd)/PB/csc309-tfc-pb"
FRONTEND_DIR="$(pwd)/PF/notus-nextjs-1.1.0"

echo "INITIALIZING CSC309 TFC PROJECT."
source env/bin/activate
python3 $BACKEND_DIR/manage.py runserver & npm run dev --prefix $FRONTEND_DIR && fg
