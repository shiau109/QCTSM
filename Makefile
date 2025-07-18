.PHONY: build build-frontend build-backend up down logs

build: build-frontend build-backend

build-frontend:
	cd frontend && docker build -f Dockerfile.prod -t scqweb_frontend:latest .

build-backend:
	cd backend && docker build -f Dockerfile.prod -t scqweb_backend:latest .

up:
	docker-compose -f docker-compose.yml -f docker-compose.dev.yml up --build -d

down:
	docker-compose down

logs:
	docker-compose logs -f
