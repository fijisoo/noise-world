export const ipfsParseLink = (link: string) => {
  if (!link) return null;
  const parsed = link.split("ipfs://")[1];
  return `https://ipfs.io/ipfs/${parsed}`;
};
