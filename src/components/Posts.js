import { useEffect, useState } from "react";
import Post from "./Post";

export default function Posts() {
  const [posts, setPosts] = useState();
  const getPosts = async () => {
    const response = await fetch("http://localhost:1337/api/blogs");
    const data = await response.json();
    setPosts(data);
  };
  useEffect(() => {
    getPosts();
  }, []);
  console.log(posts);

  return (
    <div className="px-24 py-4 mt-6">
      <p className="text-center text-3xl font-semibold">Recent Posts</p>
      <div className="grid grid-cols-4 gap-12 mt-12">
        {posts?.data?.map(
          (post) =>
            post?.attributes.show === true && (
              <Post key={post.id} attributes={post?.attributes} id={post?.id} />
            )
        )}
      </div>
    </div>
  );
}
