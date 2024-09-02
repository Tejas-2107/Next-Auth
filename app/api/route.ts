import connectMongoDB from "@/MongoDBConnecion";
import { NextResponse } from "next/server";

export async function GET() {
    const res = await connectMongoDB();
return NextResponse.json({name:"tejas",location:"Pune"})
}