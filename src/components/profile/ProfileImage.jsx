import useAxios from "../../hooks/useAxios";
import { useProfile } from "../../hooks/useProfile";
import EditIcon from "../../assets/icons/edit.svg";
import { useRef } from "react";

import { actions } from "../../actions";

const ProfileImage = () => {
  const { state, dispatch } = useProfile();
  const { api } = useAxios();

  const fileRef = useRef();

  const handleImageUpload = (e) => {
    e.preventDefault();

    fileRef.current.click();
  };

  const updateImageDisplay = async () => {
    const formData = new FormData();

    for (const file of fileRef.current.files) {
      formData.append("avatar", file);
    }

    try {
      const response = await api.post(
        `${import.meta.env.VITE_BASE_SERVER_URL}/profile/${
          state?.user?.id
        }/avatar`,
        formData
      );

      if (response.status === 200) {
        dispatch({ type: actions.profile.IMAGE_UPDATED, data: response.data });
      }
    } catch (error) {
      dispatch({
        type: actions.profile.DATA_FETCHED_ERROR,
        error: error.message,
      });
    }
  };

  return (
    <div className="relative mb-8 max-h-[180px] max-w-[180px] rounded-full lg:mb-11 lg:max-h-[218px] lg:max-w-[218px]">
      <img
        className="max-w-full h-[140px] rounded-full w-[140px] object-cover"
        src={`${import.meta.env.VITE_BASE_SERVER_URL}/${state?.user?.avatar}`}
        alt={state?.user?.firstName}
      />

      <form>
        <button
          type="submit"
          className="flex-center absolute bottom-4 right-4 h-7 w-7 rounded-full bg-[#1e1f24] hover:bg-black/80"
          onClick={handleImageUpload}
        >
          <img src={EditIcon} alt="Edit" className="rounded-full" />
        </button>

        <input
          type="file"
          name="file"
          id="file"
          onChange={updateImageDisplay}
          ref={fileRef}
          hidden
        />
      </form>
    </div>
  );
};

export default ProfileImage;
