# Prisma Seeding

## Step 1

Add the following to your `package.json` file:

```
"prisma": {
    "seed": "node prisma/seed.js"
},
```

## Step 2

Create a `seed.js` file in your `prisma/` directory


## Step 3

Write your code in the seed file. You can use the example provided in this repo to guide you.


## Step 4

- Run a migration: `npx prisma migrate dev --name some_name_here`
- If needed, generate a new prisma client: `npx prisma generate`
- Run your seed: `npx prisma db seed`
