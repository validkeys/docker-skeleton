echo "******CREATING DOCKER DATABASE******"
gosu postgres postgres --single <<- EOSQL
   CREATE DATABASE $DB_NAME;
   CREATE USER $DB_USER;
   GRANT ALL PRIVILEGES ON DATABASE $DB_NAME to $DB_USER;
EOSQL
echo ""
echo "******DOCKER DATABASE CREATED******