const apiBaseUrl = process.env.API_BASE_URL ?? "http://localhost:3000";
const config = {
  api: {
    createPost: `${apiBaseUrl}/api/post/create`,
    getPost: `${apiBaseUrl}/api/post/get`,
  },
};

export default config;
