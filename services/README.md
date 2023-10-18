## Simple Minimalistic Blog Backend

 ```js
 npm init -y
 ```
 
```js
npm i --save-dev typescript
```
```js
npx tsc --init
```

copy this to replace the generated tsconfig
```js
{
  "compilerOptions": {
    "target": "es6",
    "module": "commonjs",
    "outDir": "./dist/api",
    "rootDir": "./",
    "strict": true,
    "esModuleInterop": true
  },
  "include": ["./**/*.ts"], // Only include TypeScript files from the current directory
  "exclude": [
    "node_modules"
  ]
}
```

install the required packages
```js
npm i express dotenv redis mysql2
```
```js
npm i --save-dev @types/express @types/node ts-node nodemon
```

```js
touch app.ts .env
```
update your .env file
```bash
MYSQL_HOST=localhost
MYSQL_USER=root
MYSQL_PASSWORD=mysecretpassword
MYSQL_DATABASE=blogdb

REDIS_URL=redis://localhost:6379

```

```js
mkdir api backend
```
```js
cd api && mkdir controllers && touch blogController.ts
```
```js
cd api && mkdir routers && touch blogRoutes.ts
```
```js
cd backend && mkdir cache && touch connections.ts
```
```js
cd backend && mkdir -p db/schema && touch blogs.sql
```

```js
cd backend && mkdir db && touch connection
```
```js
cd backend && mkdir models && touch Blog.ts
```

```js
"scripts": {
    "start": "node dist/api/app.js",
    "build": "tsc",
    "dev": "tsc -w & nodemon app.ts",
    "dev_": "nodemon app.ts",
    "seed": "ts-node backend/db/seeders/blogSeeder.ts",
    "test": "echo \"Error: no test specified\" && exit 1"
  }
```

