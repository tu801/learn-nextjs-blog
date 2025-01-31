import CallToAction from "@/components/call-to-action";
import RecentPosts from "@/components/post/recent-posts";
import config from "@/config/settings";
import { PostItem } from "@/types/post";
import { Button } from "flowbite-react";
import { url } from "inspector";
import { Metadata } from "next";
import Link from "next/link";
import React from "react";

// SEO Metadata
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const awaitedParams = await params;
  const { slug } = awaitedParams;
  const result = await fetch(`${config.api.getPost}?slug=${slug}`, {
    method: "GET",
    cache: "force-cache",
  });

  if (!result.ok) {
    return {
      title: "Post Not Found",
      description: "The requested post does not exist.",
    };
  }
  const resData = await result.json();
  const post = resData.posts[0];

  return {
    title: `${post.title} - Next Blog`,
    description: post.meta_desc || post.description,
    keywords: post.key_word || config.keywords,
    openGraph: {
      title: `${post.title} - Next Blog`,
      description: post.meta_desc || post.description,
      type: "article",
      url: `${config.domain.production}/post/${post.slug}`,
      images: [{ url: post.image, alt: post.title }],
      siteName: config.siteName,
    },
    twitter: {
      card: post.title,
      site: config.siteName,
      creator: "@creator",
      images: post.image,
    },
  };
}

export default async function PostDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const awaitedParams = await params;
  const { slug } = awaitedParams;
  let post: PostItem = {
    _id: "",
    userId: "",
    title: "",
    slug: "",
    category: "",
    image: "",
    createdAt: "",
    updatedAt: "",
    content: "",
  };

  try {
    const result = await fetch(`${config.api.getPost}?slug=${slug}`, {
      method: "GET",
      cache: "force-cache",
    });

    const resData = await result.json();
    post = resData.posts[0];
  } catch (error) {
    console.log(">>>Error Loading Post ", error);
    post.title = "Error";
  }

  if (!post || post.title === "Error") {
    return (
      <main className="p-3 flex flex-col max-w-6xl mx-auto min-h-screen">
        <h2 className="text-3xl mt-10 p-3 text-center font-serif max-w-2xl mx-auto lg:text-4xl">
          Post not found
        </h2>
      </main>
    );
  } else {
    return (
      <main className="p-3 flex flex-col max-w-6xl mx-auto min-h-screen">
        <h1 className="text-3xl mt-10 p-3 text-center font-serif max-w-2xl mx-auto lg:text-4xl">
          {post && post.title}
        </h1>
        <Link
          href={`/search?category=${post && post.category}`}
          className="self-center mt-5"
        >
          <Button color="gray" pill size="xs">
            {post && post.category}
          </Button>
        </Link>
        <img
          src={post && post.image}
          alt={post && post.title}
          className="mt-10 p-3 max-h-[600px] w-full object-cover"
        />
        <div className="flex justify-between p-3 border-b border-slate-500 mx-auto w-full max-w-2xl text-xs">
          <span>{post && new Date(post.createdAt).toLocaleDateString()}</span>
          <span className="italic">
            {post && (post?.content?.length / 1000).toFixed(0)} mins read
          </span>
        </div>
        <div
          className="p-3 max-w-2xl mx-auto w-full post-content"
          dangerouslySetInnerHTML={{ __html: post?.content }}
        ></div>
        <div className="max-w-4xl mx-auto w-full">
          <CallToAction />
        </div>
        <RecentPosts limit={3} />
      </main>
    );
  }
}
