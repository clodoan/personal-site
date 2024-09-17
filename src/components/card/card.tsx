import Image from "next/image";
import React from "react";

export type Post = {
  frontMatter: {
    thumbnail: string;
    title: string;
    description: string;
    date: string;
    key: string;
    readTime: number;
  };
  slug: string;
};

export type PostCardProps = {
  post: Post;
};

export const PostCard = ({ post }: PostCardProps) => {
  return (
    <div>
      <Image src={post.frontMatter.thumbnail} alt="postCardImage" />
      <div>
        <h2>{post.frontMatter.title}</h2>
        <p>{post.frontMatter.description}</p>
        <p>{post.frontMatter.description}</p>
      </div>
      <div>
        <h2>📅 {post.frontMatter.date}</h2>
        <p>⏰ {post.frontMatter.readTime} min read</p>
      </div>
    </div>
  );
};

export default PostCard;
