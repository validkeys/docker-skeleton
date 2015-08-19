chmod +x ./start_redis
chmod +x ./start_mongo
chmod +x ./start_postgres
chmod +x ./start_app
chmod +x ./boot

mkdir -p /mnt/data/redis
mkdir -p /mnt/data/mongo
mkdir -p /mnt/data/postgresql

mkdir -p /mnt/logs/

./boot.sh