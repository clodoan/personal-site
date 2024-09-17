import { MDXRemote } from "next-mdx-remote/rsc";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Image from "next/image";
import { Text } from "@/components/text";

export default async function ArticlePage({
  params,
}: {
  params: { id: string };
}) {
  const articlePath = path.join(
    process.cwd(),
    "src/app/articles",
    `${params.id}.mdx`
  );
  const fileContents = fs.readFileSync(articlePath, "utf8");
  const { data: frontmatter, content } = matter(fileContents);

  return (
    <article className="max-w-2xl mx-auto mt-8 p-4">
      <h1 className="text-3xl font-bold mb-4">{frontmatter.title}</h1>
      <Text className="text-gray-600 mb-2">
        Published on: {frontmatter.date}
      </Text>
      <Text className="text-gray-600 mb-4">
        Read time: {frontmatter.readTime} minutes
      </Text>
      <Image
        src={frontmatter.thumbnail}
        alt={frontmatter.title}
        className="w-full h-64 object-cover mb-6"
        width={500}
        height={500}
      />
      <MDXRemote source={content} />
    </article>
  );
}
