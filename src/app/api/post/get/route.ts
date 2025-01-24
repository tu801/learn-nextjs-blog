import Post from "@/lib/models/post.model";
import { connect } from "@/lib/mongodb/mongoose";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  try {
    await connect();
    const data = {
      slug: req.nextUrl.searchParams.get("slug"),
      startIndex: req.nextUrl.searchParams.get("startIndex"),
      limit: req.nextUrl.searchParams.get("limit"),
      order: req.nextUrl.searchParams.get("order"),
      userId: req.nextUrl.searchParams.get("userId"),
      category: req.nextUrl.searchParams.get("category"),
      postId: req.nextUrl.searchParams.get("postId"),
      searchTerm: req.nextUrl.searchParams.get("searchTerm"),
    };

    if (!data.slug || data.slug === "") {
      return NextResponse.json("Invalid Request", {
        status: 403,
      });
    }

    const startIndex = parseInt(data.startIndex) || 0;
    const limit = parseInt(data.limit) || 9;
    const sortDirection = data.order === "asc" ? 1 : -1;
    const posts = await Post.find({
      ...(data.userId && { userId: data.userId }),
      ...(data.category &&
        data.category !== "null" &&
        data.category !== "undefined" && { category: data.category }),
      ...(data.slug && { slug: data.slug }),
      ...(data.postId && { _id: data.postId }),
      ...(data.searchTerm && {
        $or: [
          { title: { $regex: data.searchTerm, $options: "i" } },
          { content: { $regex: data.searchTerm, $options: "i" } },
        ],
      }),
    })
      .sort({ updatedAt: sortDirection })
      .skip(startIndex)
      .limit(limit);

    const totalPosts = await Post.countDocuments();

    const now = new Date();

    const oneMonthAgo = new Date(
      now.getFullYear(),
      now.getMonth() - 1,
      now.getDate()
    );

    const lastMonthPosts = await Post.countDocuments({
      createdAt: { $gte: oneMonthAgo },
    });

    return new Response(JSON.stringify({ posts, totalPosts, lastMonthPosts }), {
      status: 200,
    });
  } catch (error) {
    console.log("Error geting post:", error);
    return NextResponse.json("Error geting post", {
      status: 500,
    });
  }
};
