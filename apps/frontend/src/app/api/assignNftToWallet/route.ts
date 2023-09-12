import { connectToMongoDB } from "../misc/connect-db";
import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import { User } from "../misc/models/User";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function POST(request: NextRequest) {
  const data = await request.json();

  const fullModel = {
    minterWallet: data.minterWallet,
    nfts: [
      {
        collectionName: data.collectionName,
        nftName: data.nftName,
        imgUrl: data.imgUrl,
      },
    ],
  };

  if (
    !data.minterWallet ||
    !data.collectionName ||
    !data.nftName ||
    !data.imgUrl
  ) {
    return NextResponse.json({
      message: "You havent provide all required data",
      success: false,
    });
  }
  await mongoose.disconnect();
  await connectToMongoDB("Users");
  const UserSchema = new mongoose.Schema(User, {
    collection: data.minterWallet,
  });
  const UserModel =
    mongoose.models[data.minterWallet] ||
    mongoose.model(data.minterWallet, UserSchema);

  try {
    const collections = await mongoose.connection.db
      .listCollections()
      .toArray();
    const collectionNames = collections.map((collection) => collection.name);

    const isExist = collectionNames.includes(data.minterWallet);

    if (!isExist) {
      try {
        await UserModel.createCollection({
          capped: true,
          size: 1048576,
          max: 1000,
        })
          .then(() => {
            console.log("Collection created successfully");
          })
          .catch((error) => {
            console.error("Error creating collection:", error);
          });
      } catch (e) {
        return NextResponse.json({
          message: "Error while creating user collection for NFTs",
          success: false,
        });
      }
      try {
        await UserModel.insertMany(fullModel)
          .then(() => {
            console.log(`NFT added to a wallet`);
          })
          .catch((error) => {
            console.error(`Something went wrong trying to insert nft object`);
          });
        return NextResponse.json({
          message: "Added nft for given wallet address",
          success: true,
        });
      } catch (e) {
        return NextResponse.json({
          message: "Error while trying to insert nft object",
          success: false,
        });
      }
    }

    try {
      console.log(
        "minterWallet",
        data.minterWallet,
        data.collectionName,
        data.nftName,
        data.imgUrl
      );
      await UserModel.findOneAndUpdate(
        { minterWallet: data.minterWallet },
        {
          $push: {
            nfts: {
              collectionName: data.collectionName,
              nftName: data.nftName,
              imgUrl: data.imgUrl,
            },
          },
        },
        { new: true }
      )
        .then((updatedUser) => {
          if (updatedUser) {
            console.log("User updated:", updatedUser);
          } else {
            console.log("User not found");
          }
        })
        .catch((error) => {
          console.error("Error updating user:", error);
        });
      return NextResponse.json({
        message: "Added nft to existing nfts for given wallet address",
        success: true,
      });
    } catch (e) {
      return NextResponse.json({
        message: "Error while trying to push nft",
        success: false,
      });
    }
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({
      message: "There was a problem while fetching collections",
      success: false,
    });
  }
}
