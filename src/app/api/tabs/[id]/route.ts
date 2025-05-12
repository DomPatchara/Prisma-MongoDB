// url: http://localhost:3000/api/tabs/12345

import { prisma } from "@/libs/prismadb";
import { NextResponse } from "next/server";

interface Props {
  params: Promise<{ id: string }>;
}

// GET Specific ID tab
export const GET = async (req: Request, { params }: Props) => {      // req : for HTTP request
  try {
    const { id } = await params;

    const post = await prisma.post.findUnique({
      where: {
        id,
      },
    });

    if (!post) {
      return NextResponse.json({ message: "Post Not Found" }, { status: 404 });
    }

    return NextResponse.json(post);

    
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ message: "GET Error", error }, { status: 500 });
  }
};

// PATCH -- update some field data
export const PATCH = async(req: Request, { params }: Props) => {
  try {
    const body = await req.json();
    const { title, description } = body;

    const { id } = await params

    const updatePost = await prisma.post.update({
      where: {
        id
      },
      data: {
        title,
        description
      }
    })

    if (!updatePost) {
      return NextResponse.json({ message: "Update Post Not Found" }, { status: 404 });
    }

    return NextResponse.json(updatePost);

  } catch (error) {
    return NextResponse.json({message: "Update Error", error}, {status: 500})
  }
}


// DELETE Specific ID tab
export const DELETE = async (req: Request, { params }: Props) => {      // req : for HTTP request
  try {
    const { id } = await params;

    await prisma.post.delete({
      where: {
        id,
      },
    });

    return NextResponse.json("Post has been deleted");

    
  } catch (error) {
    return NextResponse.json({ message: "Delete Error", error }, { status: 500 });
  }
};

