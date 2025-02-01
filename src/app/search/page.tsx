import React from "react";
import SearchClient from "@/components/post/search-client";

interface SearchPageProps {
  searchParams: Promise<{
    searchTerm?: string;
    sort?: string;
    category?: string;
  }>;
}

export async function generateMetadata({ searchParams }: SearchPageProps) {
  // Await searchParams before using its properties
  const searchParamsResolved = await searchParams;
  const searchTermRaw = searchParamsResolved.searchTerm;
  const searchTerm = Array.isArray(searchTermRaw)
    ? searchTermRaw[0]
    : searchTermRaw || "";

  return {
    title:
      searchTerm !== ""
        ? `Kết quả tìm kiếm cho ${searchTerm}`
        : "Kết quả tìm kiếm",
    description:
      "Trang kết quả tìm kiếm các bài viết, cập nhật theo từ khóa, phân loại và sắp xếp thời gian.",
  };
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const resolvedSearchParams = await searchParams;
  return (
    <>
      <div className="flex flex-col md:flex-row">
        <SearchClient initialSearchParams={resolvedSearchParams} />
      </div>
    </>
  );
}
