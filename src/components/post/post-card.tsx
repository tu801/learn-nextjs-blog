import { PostItem } from "@/types/post";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface IProps {
  post: PostItem;
}
export default function PostCard(props: IProps) {
  const { post } = props;

  return (
    <div className="group relative w-full border border-teal-500 hover:border-2 h-[400px] overflow-hidden rounded-lg sm:w-[430px] transition-all">
      <Link href={`/post/${post.slug}`}>
        <Image
          width={430}
          height={260}
          style={{ width: "auto", height: "auto" }}
          src={post.image}
          alt={post.title}
          className="h-[260px] w-full  object-cover group-hover:h-[200px] transition-all duration-300 z-20"
          priority={true}
        />
      </Link>
      <div className="p-3 flex flex-col gap-2">
        <p className="text-lg font-semibold line-clamp-2">{post.title}</p>
        <span className="italic text-sm">{post.category}</span>
        <Link
          href={`/post/${post.slug}`}
          className="z-10 group-hover:bottom-0 absolute bottom-[-200px] left-0 right-0 border border-teal-500 text-teal-500 hover:bg-teal-500 hover:text-white transition-all duration-300 text-center py-2 rounded-md !rounded-tl-none m-2"
        >
          Read article
        </Link>
      </div>
    </div>
  );
}
