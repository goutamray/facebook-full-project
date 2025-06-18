import { useProfile } from "../../hooks/useProfile";
import EditIcon from "../../assets/icons/edit.svg";
import CheckIcon from "../../assets/icons/check.webp";

import useAxios from "../../hooks/useAxios";
import { useState } from "react";
import { actions } from "../../actions";

const Bio = () => {
  const { state, dispatch } = useProfile();
  const { api } = useAxios();

  const [bio, setBio] = useState(state?.user?.bio);
  const [editMode, setEditMode] = useState(false);

  const handleBioEdit = async () => {
    dispatch({ type: actions.profile.DATA_FETCHING });

    try {
      const res = await api.patch(
        `${import.meta.env.VITE_BASE_SERVER_URL}/profile/${state?.user?.id}`,
        { bio }
      );

      if (res.status === 200) {
        dispatch({
          type: actions.profile.USER_DATA_EDITED,
          data: res.data,
        });
      }
      setEditMode(false);
    } catch (error) {
      dispatch({
        type: actions.profile.DATA_FETCHED_ERROR,
        error: error.message,
      });
    }
  };

  return (
    <div>
      <div className="mt-4 flex items-start gap-2 lg:mt-6">
        <div className="flex-1">
          {!editMode ? (
            <p className="leading-[188%] text-white lg:text-lg">
              {state?.user?.bio}
            </p>
          ) : (
            <textarea
              value={bio}
              rows={5}
              cols={55}
              onChange={(e) => setBio(e.target.value)}
              className="p-2 text-white rounded-md lg:text-lg"
            />
          )}
        </div>
        {!editMode ? (
          <button
            className="flex-center h-7 w-7 rounded-full"
            onClick={() => setEditMode(true)}
          >
            <img src={EditIcon} alt="Edit" />
          </button>
        ) : (
          <button
            className="flex-center h-4 w-4 rounded-full"
            onClick={handleBioEdit}
          >
            <img src={CheckIcon} alt="Edit" />
          </button>
        )}
      </div>
    </div>
  );
};

export default Bio;
