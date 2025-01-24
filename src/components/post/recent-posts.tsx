import React from "react";
import PostCard from "./post-card";
import { PostItem } from "@/types/post";

interface IProps {
  limit: number;
}
export default async function RecentPosts(props: IProps) {
  const { limit } = props;
  let posts: PostItem[] = [];
  try {
    const result = await fetch(process.env.URL + "/api/post/get", {
      method: "POST",
      body: JSON.stringify({ limit: limit, order: "desc" }),
      cache: "no-store",
    });
    const data = await result.json();
    posts = data.posts;
  } catch (error) {
    console.log("Error getting post:", error);
  }
  return (
    <div className="flex flex-col justify-center items-center mb-5">
      <h1 className="text-xl mt-5">Recent articles</h1>
      <div className="flex flex-wrap gap-5 mt-5 justify-center">
        {posts && posts.map((post) => <PostCard key={post._id} post={post} />)}
      </div>
    </div>
  );
}
