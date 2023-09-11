const pako = require("pako");

export const ZipObj = (obj: object) => {
  return pako.deflate(JSON.stringify(obj));
};

export const UnZip = (compressed: any) => {
  return JSON.parse(pako.inflate(compressed, { to: "string" }));
};
