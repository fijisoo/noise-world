import { connectToMongoDB } from "../misc/connect-db";
import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import { uid } from "uid";
import { QrCodeSchemaData } from "../misc/models/QrCodes";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function POST(request: NextRequest) {
  const { collectionHostWallet, collectionName, uniqueNFTsAmount } =
    await request.json();

  const generateQrCodeHashes = Array.from(Array(uniqueNFTsAmount).keys()).map(
    () => ({
      walletAddressHashed: "",
      qrCodeHashed: uid(), // bcryptem wrzucamy do bazy i jednorazowo wysyłamy niezahashowane do klienta, generujemy QR kody i elo.
    })
  );

  const fullModel = {
    collectionHostWallet: collectionHostWallet,
    collectionName: collectionName,
    qrCodesHashed: generateQrCodeHashes,
  };

  try {
    await connectToMongoDB("QrCodes");
    try {
      const qrCodeSchema = new mongoose.Schema(QrCodeSchemaData, {
        collection: collectionName,
      });
      const QrCodesModel =
        mongoose.models[collectionName] ||
        mongoose.model(collectionName, qrCodeSchema);
      await QrCodesModel.createCollection({
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

      await QrCodesModel.insertMany(fullModel)
        .then((insertedRecipes) => {
          console.log(
            `${insertedRecipes.length} documents successfully inserted.`
          );
        })
        .catch((error) => {
          console.error(
            `Something went wrong trying to insert the new documents: ${error}`
          );
        });

      return NextResponse.json({
        message: "Collection created",
        success: true,
      });
    } catch (error) {
      console.error("Error while trying to validate QR Code:", error);
      return NextResponse.json({
        message: `Error while trying to validate QR Code: ${error}`,
        success: false,
      });
    }
  } catch (e) {
    return NextResponse.json({
      message: `General error while populateQRCodes: ${e}`,
      success: false,
    });
  }
}
