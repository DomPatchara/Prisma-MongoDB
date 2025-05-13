# Integrating Prisma + MongoDB in Next.js

## Prerequisites
- Node.js installed
- MongoDB database set up
- Next.js project initialized

## Steps

### [ 1.] Install Dependencies
```bash
npm install prisma @prisma/client
```

### [ 2.] Initialize Prisma
```bash
npx prisma init
```
This creates a `prisma` folder with a `schema.prisma` file.

### [ 3.] Configure Prisma for MongoDB
Update `datasource` in `schema.prisma`:
```prisma
generator client {
  provider = "prisma-client-js"
  output   = "../lib/generated/prisma"
}

datasource db {
    provider = "mongodb" <------------ "ใช้ my database จากเดิมเป็น Posgresql"
    url      = env("DATABASE_URL")
}
```
Set `DATABASE_URL` in `.env`:
```
DATABASE_URL="mongodb+srv://<username>:<password>@cluster.mongodb.net/<database_name>"
```

### [ 4.] Define Schema
Add models in `schema.prisma`:
```prisma
model User {
    id    String @id @default(uuid()) @map("_id") 
    name  String
    email String @unique
}
```
### [ 5.] Push Prisma Schema to Database
  push Schema ที่เราสร้างไว้ ส่งเข้าไปใน Database ของเรา --- เป็นการสร้าง Collection ใน MongoDB

```bash
npx prisma db push
```

### [ 6.] Generate Prisma Client
Run:
```bash
npx prisma generate
```

### [ 7.] Use Prisma in Next.js
Create a `lib/prismadb.ts` file:
```typescript
// src/lib/prismadb.ts
import { PrismaClient } from "./generated/prisma"

const globalForPrisma = global as unknown as {
  prisma: PrismaClient 
}

export const prisma = globalForPrisma.prisma || new PrismaClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma



```

### [ 8.] Example API Routes
Example in `/api/posts/route.ts`:
```typescript
import { prisma } from "@/libs/prismadb";
import { NextResponse } from "next/server";

// POST -- ( create new post )
export const POST = async (req: Request) => {
  try {
    const body = await req.json();
    const { name, email } = body;

    const newPost = await prisma.post.create({
      data: {
        name,
        email,
      },
    });

    return NextResponse.json(newPost);

  } catch (error) {
    return NextResponse.json({ message: "POST Error", error }, { status: 500 });
  }
};

// GET -- ( get all posts )
export const GET = async () => {   
  try {
    const posts = await prisma.post.findMany();

    return NextResponse.json(posts);
  } catch (error) {
    return NextResponse.json({ message: "GET Error", error }, { status: 500 });
  }
};
```

### 🧪 [ 9.] Test with Postman
 `POST` Request -- add new post
- URL: http://localhost:3000/api/post
- Body (JSON):
```json
{
  "name": "Tears in Heaven",
  "email": "EricClapton@gmail.com"
}
```

### 🧪 [ 10.] Use Data -- by Server Fetching 
```typescript
// page.tsx

// 1. create function fetching all posts 
const getData = async() => {
  const res = await fetch("http://localhost:3000/api/posts", { cache: 'no-store'}); //no-store --> Always fetch fresh data.

  if(!res.ok) {
    throw new Error("Failed to fetch data")
  }

  return res.json();
}

// 2. use fetching fucntion on page
const Page = async () => {

  const posts = await getData();

  return (
    <div className='max-w-4xl'>
      { posts.map((post, index)=> (
        <li key={index}>
           {post.name}
        </li>
      ))}    
    </div>
  )
}

export default Page

```

