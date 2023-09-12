import { connectToMongoDB } from "../misc/connect-db";
import { QrCodeSchemaData } from "../misc/models/QrCodes";
import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function POST(request: NextRequest) {
  const data = await request.json();

  try {
    await connectToMongoDB("QrCodes");
    const qrCodeSchema = new mongoose.Schema(QrCodeSchemaData, {
      collection: data.collectionName,
    });
    const QrCodesCollectionModel =
      mongoose.models[data.collectionName] ||
      mongoose.model(data.collectionName, qrCodeSchema);

    try {
      const collections = await mongoose.connection.db
        .listCollections()
        .toArray();
      const collectionNames = collections.map((collection) => collection.name);

      const isExist = collectionNames.includes(data.collectionName);

      if (!isExist) {
        return NextResponse.json({
          message: "Collection does not exists",
          success: false,
        });
      }
    } catch (error) {
      console.error("Error:", error);
      return NextResponse.json({
        message: "There was a problem with fetching collections",
        success: false,
      });
    }

    try {
      const document = await QrCodesCollectionModel.findOne({
        "qrCodesHashed.qrCodeHashed": data.qrCodeHashed,
      });

      if (document) {
        const found = document.qrCodesHashed.find((item: any) => {
          return item.qrCodeHashed === data.qrCodeHashed;
        });

        if (found && found.walletAddressHashed === data.walletAddress) {
          return NextResponse.json({
            message: `This code is assigned to your wallet address`,
            success: true,
          });
        }

        if (found && !!found.walletAddressHashed) {
          return NextResponse.json({
            message: `This code is already used`,
            success: false,
          });
        }
      }
    } catch (error) {
      console.error("Error:", error);
    }
    try {
      await QrCodesCollectionModel.findOneAndUpdate(
        {
          "qrCodesHashed.qrCodeHashed": data.qrCodeHashed,
        },
        {
          $set: {
            "qrCodesHashed.$.walletAddressHashed": data.walletAddress,
          },
        },
        {
          new: true,
        }
      )
        .then((updatedDocument) => {
          if (updatedDocument) {
            console.log("Document updated:", updatedDocument);
          } else {
            console.log("Document not found");
            return Promise.reject(new Error("Document not found"));
          }
        })
        .catch((error) => {
          console.error("Error updating document:", error);
          return Promise.reject(new Error(`Error updating document: ${error}`));
        });
    } catch (e) {
      console.error("Error", e);
      return NextResponse.json({
        message: "Error while updating document",
        success: false,
      });
    }
    return NextResponse.json({
      message: "updated",
      success: true,
    });
  } catch (error) {
    console.error("Error while trying to validate QR Code:", error);
    return NextResponse.json({
      message: `Error while trying to validate QR Code: ${error}`,
      success: false,
    });
  }
}
