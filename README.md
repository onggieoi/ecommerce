# ecommerce
The school's project

##
Postgresql for database
Dotnet 6 for RESTful API 
Next js for server side render client side
React js for admin site

## Quick start

Run latest postgresql container
`docker run --name some-postgres -e POSTGRES_PASSWORD=mysecretpassword -d postgres`
 
### Start Backend service
Dotnet 6, Dotnet EF

build scheme
`dotnet ef database update`

insert data in `./db/*`

Run service:
`dotnet {watch} run`

### Start Frontend Client service
node version `v14.15.5`

install package: `yarn` or `npm install`

start service: `yarn dev` or `npm run dev`

## Deployment
