# account-management-system
Tech Exam

## requirements
1. node >= 16
2. npm >= 8
3. docker >= 20.10.17
4. docker-compose >= 1.29.2

## steps to run dev env

1. copy .env.example .env
1.1. change .env file for prod use
2. npm ci
3. docker-compose up -d postgres
4. npm run dev

## steps to run demo env
1. docker-compose up -d

#### Please find postman collections in the folder `postman`
