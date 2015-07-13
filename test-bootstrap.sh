# DEV
export PGPASSWORD='florian';
DB_CONNECTION="heroku pg:psql --app lynk-test DATABASE"

echo "[DROP SCHEMA]"
echo "DROP SCHEMA public CASCADE;" | eval $DB_CONNECTION

echo "[CREATE SCHEMA]"
echo "CREATE SCHEMA public;" | eval $DB_CONNECTION


echo ""
echo "Deploy"
git push heroku master

echo "open in navigator"
timeout 60 xdg-open http://lynk-test.herokuapp.com/

# insert DB
echo "[CREATE LANGUAGE]"
eval $DB_CONNECTION < script/basic_data.sql

#import
curl -H "Content-Type: application/json" -X POST -d  '{"email":"florian.jeanmart@gmail.com","password":"password"}' http://lynk-test.herokuapp.com/import_category
curl -H "Content-Type: application/json" -X POST -d  '{"email":"florian.jeanmart@gmail.com","password":"password"}' http://lynk-test.herokuapp.com/import_demo

echo "Done !"