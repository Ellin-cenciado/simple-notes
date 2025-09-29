git https://github.com/hirelens-challenges/Benitez-80d67f.git
cd ./Benitez-80d67f

sudo apt-get update
sudo apt-get install docker-compose-plugin

docker compose version

# Start everything
sudo docker compose up --build