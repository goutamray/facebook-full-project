import { useState } from "react";

import PostCommentList from "./PostCommentList";

import useAxios from "../../hooks/useAxios";
import { useAuth } from "../../hooks/useAuth";

const PostComment = ({ post }) => {
  const [hideshowComment, setHideShowComment] = useState(false);

  const { auth } = useAuth();

  const [comments, setComments] = useState(post?.comments);

  const [comment, setComment] = useState("");
  const { api } = useAxios();

  // handle add comment
  const handleAddComment = async (e) => {
    const keyCode = e.keyCode;

    try {
      if (keyCode === 13) {
        const response = await api.patch(
          `${import.meta.env.VITE_BASE_SERVER_URL}/posts/${post?.id}/comment`,
          { comment }
        );

        if (response.status === 200) {
          setComments([...response.data.comments]);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div>
        <div className="flex-center mb-3 gap-2 lg:gap-4">
          <img
            className="max-w-7 max-h-7 rounded-full lg:max-h-[34px] lg:max-w-[34px]"
            src={`${import.meta.env.VITE_BASE_SERVER_URL}/${
              auth?.user?.avatar
            }`}
            alt="avatar"
          />
          <div className="flex-1">
            <input
              type="text"
              className="h-8 w-full rounded-full bg-lighterDark px-4 text-xs focus:outline-none sm:h-[38px]"
              name="post"
              id="post"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              onKeyDown={(e) => handleAddComment(e)}
              placeholder="What's on your mind?"
            />
          </div>
        </div>

        <div className="mt-4">
          <button
            className="text-gray-300 max-md:text-sm"
            onClick={() => setHideShowComment(!hideshowComment)}
          >
            All Comment ▾
          </button>
        </div>

        <div className="space-y-4 divide-y divide-lighterDark pl-2 lg:pl-3">
          {hideshowComment && <PostCommentList comments={comments} />}
        </div>
      </div>
    </>
  );
};

export default PostComment;
