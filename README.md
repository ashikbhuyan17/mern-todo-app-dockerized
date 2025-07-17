# 🚀 MERN Todo App (Dockerized)

This project Dockerizes the database, backend, and frontend of a MERN Todo App.
For full setup details, check this link: </br>
👉 https://www.notion.so/Building-multiple-containers-with-docker-23203c72720a80fca933dd70245bc969?source=copy_link

# Dockerize

```bash
# ধাপ ১: MongoDB official image ডাউনলোড করুন
docker pull mongo

# ধাপ ২: MongoDB container ব্যাকগ্রাউন্ডে চালু করুন (পোর্ট ও রুট ইউজার সহ)
docker run -d --name mongodb -p 27017:27017 -e MONGO_INITDB_ROOT_USERNAME=admin -e MONGO_INITDB_ROOT_PASSWORD=pass123 mongo

# ধাপ ৩: Volume ও নেটওয়ার্ক সহ MongoDB container চালান
docker run --name mongodb --rm -v ts-docker-db:/data/db --network ts-docker-net -e MONGO_INITDB_ROOT_USERNAME=ts-docker -e MONGO_INITDB_ROOT_PASSWORD=ts-docker mongo

# ধাপ ৪: চলমান Docker container গুলো দেখুন
docker ps

# ধাপ ৬: Docker network তৈরি করুন (backend ও mongodb এর জন্য)
docker network create ts-docker-net

# ধাপ ৭: নিরাপদ MongoDB container নেটওয়ার্কে চালান (পোর্ট প্রকাশ ছাড়া)
docker run --name mongodb --rm --network ts-docker-net mongo

docker run --name mongodb --rm --network ts-docker-net -e MONGO_INITDB_ROOT_USERNAME=ts-docker -e MONGO_INITDB_ROOT_PASSWORD=ts-docker mongo

# ধাপ ৮: `.env` ফাইলে MongoDB URI দিন (backend কানেকশনের জন্য)
echo "DATABASE_URL=mongodb://mongodb:27017" > .env

# ধাপ ৯: Backend Docker image তৈরি করুন
docker build -t ts-docker-backend:v5 .

# ধাপ ১০: Backend container নেটওয়ার্ক ও ভলিউম সহ চালান
docker run --name ts-docker-backend-container --rm --network ts-docker-net --env-file .env -w /app -v ts-docker-logs:/app/logs -v "$(pwd)":/app -v /app/node_modules -p 5000:5000 ts-docker-backend:v5

# ধাপ ১১: Frontend Docker image তৈরি করুন
docker build -t ts-docker-frontend:v5 .

# ধাপ ১২: `.env.local` ফাইলে API URL দিন (backend কানেকশনের জন্য)
echo "NEXT_PUBLIC_API_BASE_URL=http://ts-docker-backend-container:5000/api/v1" > .env.local


# ধাপ ১৩: Frontend container নেটওয়ার্ক সহ চালান
docker run \
  --name ts-docker-frontend-container \
  --rm \
  -p 3000:3000 \
  --env-file .env.local \
  -w /app \
  -v "$(pwd)":/app \
  -v /app/node_modules \
  --network ts-docker-net \
  -e WATCHPACK_POLLING=true \
  ts-docker-frontend:v5
