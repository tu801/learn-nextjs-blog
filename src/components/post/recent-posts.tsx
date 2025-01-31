import React from "react";
import PostCard from "./post-card";
import { PostItem } from "@/types/post";
import config from "@/config/settings";

interface IProps {
  limit: number;
}
export default async function RecentPosts(props: IProps) {
  const { limit } = props;
  let posts: PostItem[] = [];
  try {
    const result = await fetch(
      `${config.api.getPost}?limit=${limit}&order=desc`,
      {
        method: "GET",
        cache: "no-store",
      }
    );
    const data = await result.json();
    posts = data.posts;

    console.log(">>>Recent posts: ", posts);
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
