import DotIcon from "../../assets/icons/3dots.svg";
import EditIcon from "../../assets/icons/edit.svg";
import DeleteIcon from "../../assets/icons/delete.svg";
import TimeIcon from "../../assets/icons/time.svg";
import { getDateDifferenceFromNow } from "../../utils";
import { useAvater } from "../../hooks/useAvater";
import { useState } from "react";

const PostHeader = ({ post }) => {
  const [showAction, setShowAction] = useState(false);

  const { avatarUrl } = useAvater(post);

  return (
    <div>
      <header className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          {avatarUrl && (
            <img
              src={avatarUrl}
              alt="Author Avatar"
              className="w-10 h-10 rounded-full"
            />
          )}
          <div>
            <h6 className="text-lg lg:text-xl">{post?.author?.name}</h6>
            <div className="flex items-center gap-1.5">
              <img src={TimeIcon} alt="time" />

              <span className="text-sm text-gray-400 lg:text-base">{`${getDateDifferenceFromNow(
                post?.createAt
              )} ago`}</span>
            </div>
          </div>
        </div>

        <div className="relative">
          <button onClick={() => setShowAction(!showAction)}>
            <img src={DotIcon} alt="3dots of Action" />
          </button>

          {showAction && (
            <div className="action-modal-container">
              <button className="action-menu-item hover:text-lwsGreen">
                <img src={EditIcon} alt="Edit" />
                Edit
              </button>
              <button className="action-menu-item hover:text-red-500">
                <img src={DeleteIcon} alt="Delete" />
                Delete
              </button>
            </div>
          )}
        </div>
      </header>
    </div>
  );
};

export default PostHeader;
