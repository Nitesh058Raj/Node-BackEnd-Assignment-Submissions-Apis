rm -rf ../database
git pull
docker-compose down -v --remove-orphans
docker rmi nodeapp_jwt:v1
docker-compose up -d
