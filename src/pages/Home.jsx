import React, { useEffect, useState } from "react";
import appwriteService from "../appwrite/config";
import { Container, PostCard } from "../components/index";

function Home() {
  // The setPosts function is same in every page but it is a local function just for that file mean every file have its own setPost function which use useState() to get all the posts
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    appwriteService.getPosts().then((posts) => {
      if (posts) {
        setPosts(posts.documents);
      }
    });
  }, []);
  // If there is No post Then Give a message to user to login
  if (posts.length === 0) {
    return (
      <div className="w-full py-8 mt-4 text-center">
        <Container>
          <div className="flex flex-wrap">
            <div className="p-2 w-full">
              <h1 className="text-2xl font-bold hover:text-gray-500">
                Login to read posts
              </h1>
            </div>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className="w-full py-8">
      <Container>
        <div className="flex flex-wrap">
          {posts.map((post) => (
            <div key={post.$id} className="p-2 w-1/4">
              <PostCard {...post} />
              {/* There was a bug of </div> ; and this endline colons which had give alot of fricton to me and also the parantneses {} intead i have to use () */}
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}

export default Home;
