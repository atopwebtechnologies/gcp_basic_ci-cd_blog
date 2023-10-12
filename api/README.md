## Simple Minimalistic Blog Backend

 ```js
 npm init -y
 ```
 update the name in package.json from blog-ci-cd to blog-ci-cd-backend. This has no significant impact as it is not being published to any registry.
```js
{
    "name": "blog-ci-cd-backend"
}
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
    "target": "ES2020",
    "module": "commonjs",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "outDir": "./dist",
    "rootDir": "./src"
  },
  "include": ["src/**/*.ts"],
  "exclude": ["node_modules"]
}
```

```js
mkdir src
```
```js
cd src
```
```js
touch server.ts routes.ts controllers.ts .env
```
if the command does not work, just create the files manually.

install the required packages
```js
npm i express morgan cors dotenv
```
```js
npm i --save-dev @types/express @types/morgan @types/cors @types/node ts-node nodemon
```

 - go to server.ts and start writing code put the port in .env

- write scripts to test if our inital set up is good `"dev": "nodemon src/server.ts"` run `npm run dev`

- Before delving into the database and infrastructure, lets create all the neccessary routes and controllers
`controllers - addBlogPost, updateBlogPost, deleteBlogPost, getBlogPost, getAllBlogPost`

- url - `/api/v1/blogs{/:postId}`


lets setup prisma (assumption here is that the database infrastructure is already provided)

```js
npm i prisma
```
creates the prisma schema
```js
npx prisma init 
```
update the DATABASE_URL in the .env file

create the post model
```js
model Post {
  id        Int      @id @default(autoincrement())
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  title     String   @db.VarChar(255)
  content   String   @db.VarChar(1000)
}
```

migrate the prisma model to the native database you are using.
```js
npx prisma migrate dev --name init 
```

install the prisma client to talk to the databse from the nodejs application
```js
npm install @prisma/client
```

