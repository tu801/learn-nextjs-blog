export type PostFormData = {
  title: string;
  category: string;
  image: string;
  content: string;
};

export type PostItem = PostFormData & {
  _id: string;
  userId: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
};
