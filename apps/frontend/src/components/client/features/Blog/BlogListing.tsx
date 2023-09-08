import { BlogCard } from "./BlogCard";

export const BlogListing = () => {
  const blogModel = [
    {
      id: 0,
      title: "Title of the post #0",
      description: "Description of the post",
      publishDate: "09.09.2023",
      featuredImgSrc:
        "https://www.ibisbis.com.au/adm/thumb2.aspx?src=/userfiles/Images/News/Work%20in%20Progress.jpg",
      altText: "Post image #1",
      slug: "title-of-the-post-01",
    },
    {
      id: 0,
      title: "Title of the post #1",
      description:
        "Description of the postescription of the postescription of the postescription of the postescription of the post 69",
      publishDate: "09.09.2023",
      featuredImgSrc:
        "https://www.ibisbis.com.au/adm/thumb2.aspx?src=/userfiles/Images/News/Work%20in%20Progress.jpg",
      altText: "Post image #1",
      slug: "title-of-the-post-01",
    },
    {
      id: 0,
      title: "Title of the post",
      description: "Description of the post",
      publishDate: "09.09.2023",
      featuredImgSrc:
        "https://www.ibisbis.com.au/adm/thumb2.aspx?src=/userfiles/Images/News/Work%20in%20Progress.jpg",
      altText: "Post image #1",
      slug: "title-of-the-post-01",
    },
    {
      id: 0,
      title: "Title of the post",
      description: "Description of the post",
      publishDate: "09.09.2023",
      featuredImgSrc:
        "https://www.ibisbis.com.au/adm/thumb2.aspx?src=/userfiles/Images/News/Work%20in%20Progress.jpg",
      altText: "Post image #1",
      slug: "title-of-the-post-01",
    },
    {
      id: 0,
      title: "Title of the post",
      description: "Description of the post",
      publishDate: "09.09.2023",
      featuredImgSrc:
        "https://www.ibisbis.com.au/adm/thumb2.aspx?src=/userfiles/Images/News/Work%20in%20Progress.jpg",
      altText: "Post image #1",
      slug: "title-of-the-post-01",
    },
    {
      id: 0,
      title: "Title of the post",
      description: "Description of the post",
      publishDate: "09.09.2023",
      featuredImgSrc:
        "https://www.ibisbis.com.au/adm/thumb2.aspx?src=/userfiles/Images/News/Work%20in%20Progress.jpg",
      altText: "Post image #1",
      slug: "title-of-the-post-01",
    },
    {
      id: 0,
      title: "Title of the post",
      description: "Description of the post",
      publishDate: "09.09.2023",
      featuredImgSrc:
        "https://www.ibisbis.com.au/adm/thumb2.aspx?src=/userfiles/Images/News/Work%20in%20Progress.jpg",
      altText: "Post image #1",
      slug: "title-of-the-post-01",
    },
    {
      id: 0,
      title: "Title of the postTitle of the postTitle of the post",
      description: "Description of the post",
      publishDate: "09.09.2023",
      featuredImgSrc:
        "https://www.ibisbis.com.au/adm/thumb2.aspx?src=/userfiles/Images/News/Work%20in%20Progress.jpg",
      altText: "Post image #1",
      slug: "title-of-the-post-01",
    },
    {
      id: 0,
      title: "Title of the post",
      description: "Description of the post",
      publishDate: "09.09.2023",
      featuredImgSrc:
        "https://www.ibisbis.com.au/adm/thumb2.aspx?src=/userfiles/Images/News/Work%20in%20Progress.jpg",
      altText: "Post image #1",
      slug: "title-of-the-post-01",
    },
    {
      id: 0,
      title: "Title of the post",
      description: "Description of the post",
      publishDate: "09.09.2023",
      featuredImgSrc:
        "https://www.ibisbis.com.au/adm/thumb2.aspx?src=/userfiles/Images/News/Work%20in%20Progress.jpg",
      altText: "Post image #1",
      slug: "title-of-the-post-01",
    },
  ];
  return (
    <div className="flex flex-wrap gap-3">
      {blogModel.map((el) => (
        <BlogCard {...el} />
      ))}
    </div>
  );
};
