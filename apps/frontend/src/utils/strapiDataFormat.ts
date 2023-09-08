export const formatData = (dataISO8601: any) => {
  const data = new Date(dataISO8601);
  const year = data.getFullYear();
  const month = (data.getMonth() + 1).toString().padStart(2, "0");
  const day = data.getDate().toString().padStart(2, "0");

  const publishedAt = `${year}-${month}-${day}`;

  return publishedAt
};
