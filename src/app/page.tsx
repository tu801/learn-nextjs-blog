import CallToAction from "@/components/call-to-action";
import RecentPosts from "@/components/post/recent-posts";
import config from "@/config/settings";
import Link from "next/link";
import React from "react";

export default async function HomePage() {
  let posts = null;
  try {
    console.log(
      ">>>Fetching posts URL: ",
      `${config.api.getPost}?limit=9&order=desc`
    );
    const result = await fetch(`${config.api.getPost}?limit=9&order=desc`, {
      method: "GET",
      cache: "no-store",
    });
    const data = await result.json();
    posts = data.posts;
  } catch (error) {
    console.log("Error getting post:", error);
  }

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="flex flex-col gap-6 p-28 px-3 max-w-6xl mx-auto ">
        <h1 className="text-3xl font-bold lg:text-6xl">Welcome to my Blog</h1>
        <p className="text-gray-500 text-sm sm:text-base">
          Discover a variety of articles and tutorials on topics such as web
          development, software engineering, and programming languages, all
          brought to you through a blog built with Next.js and{" "}
          <a
            href="https://go.clerk.com/fgJHKlt"
            className="text-teal-500 hover:underline"
            target="_blank"
          >
            Clerk
          </a>
          .
        </p>
        <Link
          href="/search"
          className="text-xs sm:text-sm text-teal-500 font-bold hover:underline"
        >
          View all posts
        </Link>
      </div>
      <div className="p-3 bg-amber-100 dark:bg-slate-700">
        <CallToAction />
      </div>
      <div className="p-3 flex flex-col gap-8 py-7">
        <RecentPosts limit={9} />
        <Link
          href={"/search?category=null"}
          className="text-lg text-teal-500 hover:underline text-center"
        >
          View all posts
        </Link>
      </div>
    </div>
  );
}
