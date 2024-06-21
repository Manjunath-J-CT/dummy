import { connectToDB } from "@/lib/utils";
import { Product } from "@/lib/models";
import { NextResponse } from "next/server";

type Product = {
  name: string;
  price: number;
  description: string;
  image: string;
};

export const GET = async (req: Request) => {
  try {
    
    await connectToDB();
    const products = await Product.find();
    return NextResponse.json(products);
  } catch (error) {
    console.log(error);
    throw new Error("error");
  }
};

export const POST = async (req: Request) => {
  try {
    const product: Product = await req.json();

    await connectToDB();
    const newProduct = new Product(product);
    await newProduct.save();

    return NextResponse.json(newProduct);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: 'Failed to add product' }, { status: 500 });
  }
};