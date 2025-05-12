// url: http://localhost:3000/api/tabs

import { prisma }from "@/libs/prismadb";
import { NextResponse } from "next/server";

// POST New data
export const POST = async (req: Request) => {
  try {
    const body = await req.json();
    const { title, description } = body;

    const newPost = await prisma.post.create({
      data: {
        title,
        description,
      },
    });

    return NextResponse.json(newPost);
  } catch (error) {
    return NextResponse.json({ message: "POST Error", error }, { status: 500 });
  }
};

// GET All Data
export const GET = async () => {    // ถ้า fetch all data ไม่ต้องใช้ request ก็ได้ ( นอกจากจะใช้สำหรับ specific ID, POST, PUT)
  try {
    const posts = await prisma.post.findMany();

    return NextResponse.json(posts);
  } catch (error) {
    return NextResponse.json({ message: "GET Error", error }, { status: 500 });
  }
};
