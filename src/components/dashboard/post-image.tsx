import Image from "next/image";
import React, { useState } from "react";
import { FaSpinner } from "react-icons/fa";

export default function PostImage({ src }: { src: string }) {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="relative w-full h-72">
      {/* Hiển thị biểu tượng loading khi ảnh chưa tải xong */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-200">
          <FaSpinner className="text-gray-500 animate-spin text-3xl" />
        </div>
      )}

      {/* Ảnh chính */}
      <Image
        src={src}
        alt="upload"
        width={100}
        height={288}
        className="w-full h-72 object-contain"
        onLoadingComplete={() => setIsLoading(false)} // Xóa trạng thái loading khi tải xong
        onError={() => setIsLoading(false)} // Xử lý lỗi nếu không tải được ảnh
      />
    </div>
  );
}
