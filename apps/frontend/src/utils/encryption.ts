import CryptoJS from "crypto-js";

export const encryptData = (dataToEncrypt: string) => {
  return CryptoJS.AES.encrypt(
    CryptoJS.enc.Utf8.parse(dataToEncrypt),
    process.env.NEXT_PUBLIC_ENCRYPTION_HASH
  ).toString();
};

export const decryptData = (encryptedData: any) => {
  const bytes = CryptoJS.AES.decrypt(
    encryptedData,
    process.env.NEXT_PUBLIC_ENCRYPTION_HASH
  );
  return CryptoJS.enc.Utf8.stringify(bytes);
};
