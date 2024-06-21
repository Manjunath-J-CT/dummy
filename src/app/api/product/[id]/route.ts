import { connectToDB } from "@/lib/utils";
import { Product } from "@/lib/models";
import { NextResponse } from "next/server";

type Product = {
  name: string;
  price: number;
  description: string;
  image: string;
};

export const GET = async (
  req: Request,
  { params }: { params: { id: string } }
) => {
  try {
    await connectToDB();
    const product = await Product.findById(params.id);
    return NextResponse.json(product);
  } catch (error) {
    console.log(error);
    throw new Error("error");
  }
};

export const PUT = async (
  req: Request,
  { params }: { params: { id: string } }
) => {
  try {
    const product: Product = await req.json();

    await connectToDB();
    const updatedProduct = await Product.findByIdAndUpdate(params.id, product, {
      new: true,
    });

    return NextResponse.json(updatedProduct);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Failed to update product" },
      { status: 500 }
    );
  }
};

export const DELETE = async (
  req: Request,
  { params }: { params: { id: string } }
) => {
  try {
    await connectToDB();
    await Product.findByIdAndDelete(params.id);
    return NextResponse.json({ message: "Product deleted successfully" });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Failed to delete product" },
      { status: 500 }
    );
  }
};
