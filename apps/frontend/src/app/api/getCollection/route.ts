import { User } from "../misc/models/User";
import { connectToMongoDB } from "../misc/connect-db";
import { NextResponse } from "next/server";
import mongoose from "mongoose";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const user = searchParams.get("walletAddress");

  if (!user) {
    return NextResponse.json({
      message: `Error parsing search params`,
      success: false,
    });
  }

  try {
    await connectToMongoDB("Users");
    const userSchema = new mongoose.Schema(User, {
      collection: user,
    });

    const UserModel = mongoose.models[user] || mongoose.model(user, userSchema);

    const data = await UserModel.find({});

    return NextResponse.json({
      message: `success`,
      data: data,
      success: true,
    });
  } catch (e) {
    console.error("errr", e);
    return NextResponse.json({
      message: `Error while user data fetch`,
      success: false,
    });
  }
}
