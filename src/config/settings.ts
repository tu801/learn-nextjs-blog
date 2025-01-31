const apiBaseUrl = process.env.API_BASE_URL ?? "http://localhost:3000";
const config = {
  title: "Next Blog - Learning NextJs Blog",
  description: "Learning NextJs Blog",
  keywords: "NextJs, Blog, Learning",
  siteName: "nextjs-blog.com",
  domain: {
    production: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000/",
  },
  api: {
    createPost: `${apiBaseUrl}/api/post/create`,
    getPost: `${apiBaseUrl}/api/post/get`,
  },
};

console.log(">>>Config Profile : ", config);
export default config;
