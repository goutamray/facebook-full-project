// import images
import likeImg from "../../assets/icons/like.svg";
import commentImg from "../../assets/icons/comment.svg";
import shareImg from "../../assets/icons/share.svg";
import likedFillIcon from "../../assets/icons/like-filled.svg";

import { useState } from "react";
import useAxios from "../../hooks/useAxios";
import { useAuth } from "../../hooks/useAuth";

const PostActions = ({ commentCount, post }) => {
  const { auth } = useAuth();

  const [liked, setLiked] = useState(post?.likes?.includes(auth?.user?.id));

  const { api } = useAxios();

  const handleLike = async () => {
    try {
      const response = await api.patch(
        `${import.meta.env.VITE_BASE_SERVER_URL}/posts/${post?.id}/like`
      );

      if (response.status === 200) {
        setLiked(true); // or use response.data.liked
      }
    } catch (error) {
      console.error("Like failed:", error);
    }
  };

  return (
    <>
      <div className="flex items-center justify-between py-6 lg:px-10 lg:py-8">
        <button
          onClick={handleLike}
          className="flex-center gap-2 text-xs font-bold text-[#B8BBBF] hover:text-white lg:text-sm"
        >
          <img
            src={liked ? likedFillIcon : likeImg}
            alt="Like"
            className="w-5 h-5"
          />
          <span>{!liked && "Like"}</span>
        </button>

        <button className="icon-btn space-x-2 px-6 py-3 text-xs lg:px-12 lg:text-sm">
          <img src={commentImg} alt="Comment" />
          <span>Comment ( {commentCount ?? 0} ) </span>
        </button>

        <button className="flex-center gap-2 text-xs font-bold text-[#B8BBBF] hover:text-white lg:text-sm">
          <img src={shareImg} alt="Share" />
          <span>Share</span>
        </button>
      </div>
    </>
  );
};

export default PostActions;
