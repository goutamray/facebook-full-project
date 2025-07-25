import { useState } from "react";
import PostEntry from "./PostEntry";
import { useAuth } from "../../hooks/useAuth";

const NewPosts = () => {
  const [showPostEntry, setShowPostEntry] = useState(false);
  const { auth } = useAuth();

  return (
    <>
      {showPostEntry ? (
        <PostEntry onCreate={() => setShowPostEntry(false)} />
      ) : (
        <div className="card">
          <div className="flex-center mb-3 gap-2 lg:gap-4">
            <img
              className="max-w-10 max-h-10 rounded-full lg:max-h-[40px] lg:max-w-[40px] object-cover"
              src={`${import.meta.env.VITE_BASE_SERVER_URL}/${
                auth?.user?.avatar
              }`}
              alt="avatar"
            />
            <div className="flex-1">
              <textarea
                onClick={() => setShowPostEntry(true)}
                className="h-16 w-full rounded-md bg-lighterDark p-3 focus:outline-none sm:h-20 sm:p-6"
                name="post"
                id="post"
                placeholder="What's on your mind?"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default NewPosts;
