gosu postgres postgres --single <<- EOSQL
    CREATE USER presslyuser;
    CREATE DATABASE presslyprod;
    GRANT ALL PRIVILEGES ON DATABASE presslyprod TO presslyuser;
EOSQL
