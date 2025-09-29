# Quick Start Guide

## Get Started

## Quickly Start with the preconfigured Ubuntu bash script

```bash
chmod +x ./set-up.sh
./set-up.sh
```

Note that this script requires sudo priviledges.

### Step 1: Install Docker

Download and install Docker Desktop:

- **Windows/Mac:** <https://www.docker.com/products/docker-desktop/>
- **Linux:** <https://docs.docker.com/desktop/setup/install/linux/>
        -**Ubuntu** <https://docs.docker.com/desktop/setup/install/linux/ubuntu/>

### Step 2: Clone & Run

```bash
# Clone the repository
git clone https://github.com/hirelens-challenges/Benitez-80d67f.git
cd ./Benitez-80d67f.git

# Start everything
docker-compose up --build
```

### Step 3: Use the App

Open your browser and go to: **http://localhost:3000**

---


## Stopping the App

Press `Ctrl+C` in the terminal where Docker is running, then:

```bash
docker-compose down
```

## Starting Again Later

Just run:

```bash
docker-compose up
```

## Common Issues

### "Port already in use"

Another service is using the same port. Either:

- Stop the conflicting service
- Change the port in `docker-compose.yml`

```yml
ports:
   - "3307:3306" <---Change this to something else
```

### "Docker is not running"

Make sure Docker Desktop is open and running.

### "Command not found: docker-compose"

If you installed Docker recently, try:

```bash
docker compose up --build
```

