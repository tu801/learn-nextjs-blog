"use client";
import { useUser } from "@clerk/nextjs";
import {
  Alert,
  Button,
  FileInput,
  Select,
  Spinner,
  TextInput,
} from "flowbite-react";
import React, { useEffect, useState } from "react";

import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";

import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "@/firebase";
import { useRouter } from "next/navigation";
import { PostFormData } from "@/types/post";
import PostImage from "@/components/dashboard/post-image";
import { toast } from "react-toastify";
import { useError } from "@/contexts/ErrorContext";
import config from "@/config/settings";

export default function CreatePostPage() {
  const { isSignedIn, user, isLoaded } = useUser();

  const [file, setFile] = useState<File | null>(null);
  const [imageUploadProgress, setImageUploadProgress] = useState<number | null>(
    null
  );
  const [imageUploadError, setImageUploadError] = useState("");
  const [formData, setFormData] = useState<PostFormData | null>({
    title: "",
    category: "",
    image: "",
    content: "",
  });
  const [publishError, setPublishError] = useState("");
  const { setErrorMessage } = useError();
  const router = useRouter();

  console.log(formData);

  useEffect(() => {
    if (publishError !== "") {
      toast.error(publishError);
    }

    if (isLoaded) {
      if (!isSignedIn || !user?.publicMetadata?.isAdmin) {
        setErrorMessage("You're not authorized to view this page");
        router.push("/error"); // Điều hướng đến trang lỗi
      }
    }
  }, [publishError, isLoaded, isSignedIn, user, router]);

  if (!isLoaded) {
    return <div>Loadding...</div>;
  }

  const handleUpdloadImage = async () => {
    try {
      if (!file) {
        setImageUploadError("Please select an image");
        return;
      }
      setImageUploadError("");
      const storage = getStorage(app);
      const fileName = new Date().getTime() + "-" + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setImageUploadProgress(Number(progress.toFixed(1)));
        },
        (error) => {
          console.log(">>>Upload error: ", error);
          setImageUploadError("Image upload failed");
          setImageUploadProgress(null);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setImageUploadProgress(null);
            setImageUploadError("");
            if (formData) {
              setFormData({ ...formData, image: downloadURL });
            }
          });
        }
      );
    } catch (error) {
      setImageUploadError("Image upload failed");
      setImageUploadProgress(null);
      console.log(">>>Upload error: ", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      formData?.title === "" ||
      formData?.category === "" ||
      formData?.content === ""
    ) {
      setPublishError("Please input Title, content or select category first!");
      return;
    }

    try {
      const res = await fetch(config.api.createPost, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          userMongoId: user?.publicMetadata.userMongoId,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setPublishError(data.message);
        return;
      }
      if (res.ok) {
        setPublishError("");
        router.push(`/post/${data.slug}`);
      }
    } catch (error) {
      console.log(">>>Form submit error: ", error);
      setPublishError("Some thing went wrong");
    }
  };

  return (
    <div className="p-3 max-w-3xl mx-auto min-h-screen">
      <h1 className="text-center text-3xl my-7 font-semibold">Create a post</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-4 sm:flex-row justify-between">
          <TextInput
            type="text"
            placeholder="Title"
            id="title"
            className="flex-1"
            onChange={(e) =>
              setFormData((prev) => ({
                ...(prev || {
                  title: "",
                  category: "",
                  image: "",
                  content: "",
                }),
                title: e.target.value,
              }))
            }
          />
          <Select
            onChange={(e) =>
              setFormData((prev) => ({
                ...(prev || {
                  title: "",
                  category: "",
                  image: "",
                  content: "",
                }),
                category: e.target.value,
              }))
            }
          >
            <option value="uncategorized">Select a category</option>
            <option value="javascript">JavaScript</option>
            <option value="reactjs">React.js</option>
            <option value="nextjs">Next.js</option>
          </Select>
        </div>
        <div className="flex gap-4 items-center justify-between border-4 border-teal-500 border-dotted p-3">
          <FileInput
            accept="image/*"
            onChange={(e) => {
              if (e.target.files) {
                const selectedFile = e.target.files[0];
                setFile(selectedFile);
                const imageUrl = URL.createObjectURL(selectedFile);
                setFormData((prev) => ({
                  ...(prev || {
                    title: "",
                    category: "",
                    image: "",
                    content: "",
                  }),
                  image: imageUrl,
                }));
              }
            }}
          />
          <Button
            type="button"
            gradientDuoTone="purpleToBlue"
            size="sm"
            outline
            disabled={imageUploadProgress !== null}
            onClick={handleUpdloadImage}
          >
            {imageUploadProgress ? (
              <div className="w-6 h-6">
                {/* <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4 dark:bg-gray-700">
                    <div
                      className="bg-indigo-600 h-2.5 rounded-full dark:bg-indigo-500"
                      style={{ width: `${imageUploadProgress || 0}%` }}
                    ></div>
                  </div> */}
                <Spinner color="failure" aria-label="Uploading..." />
              </div>
            ) : (
              "Upload Image"
            )}
          </Button>
        </div>

        {imageUploadError && <Alert color="failure">{imageUploadError}</Alert>}
        {formData?.image && <PostImage src={formData.image} />}

        <ReactQuill
          theme="snow"
          placeholder="Write something..."
          className="h-72 mb-12"
          onChange={(value) => {
            setFormData((prev) => ({
              ...(prev || {
                title: "",
                category: "",
                image: "",
                content: "",
              }),
              content: value,
            }));
          }}
        />
        <Button type="submit" gradientDuoTone="purpleToPink">
          Publish
        </Button>
      </form>
    </div>
  );
}
