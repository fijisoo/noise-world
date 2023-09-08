import Image from "next/image";

export const BlogPostTemplate = ({ slug }: any) => {
  const { featuredImgSrc, title, content, publishDate, altText } = {
    title: "Title of the post #0",
    content:
      "Description of the post Description of the postDescription of the postDescription of the postDescription of the postDescription of the postDescription of the postDescription of the post",
    publishDate: "09.09.2023",
    featuredImgSrc:
      "https://www.ibisbis.com.au/adm/thumb2.aspx?src=/userfiles/Images/News/Work%20in%20Progress.jpg",
    altText: "Post image #1",
  };

  return (
    <div className="flex max-w-[600px] flex-col">
      <div className="relative flex w-full w-[600px] h-[300px]">
        <Image src={featuredImgSrc} alt={altText} fill unoptimized />
      </div>
      <div className="flex w-full justify-end text-xxs">{publishDate}</div>
      <div className="flex w-full text-base font-bold">{title}</div>
      <div className="flex w-full text-xs">{content}</div>
    </div>
  );
};
