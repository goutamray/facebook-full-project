import { useAuth } from "../../hooks/useAuth";
import { useProfile } from "../../hooks/useProfile";
import useAxios from "../../hooks/useAxios";
import { useForm } from "react-hook-form";
import { actions } from "../../actions";
import { usePost } from "../../hooks/usePost";

import AddPhoto from "../../assets/icons/addPhoto.svg";
import Field from "../common/Field";

const PostEntry = ({ onCreate }) => {
  const { auth } = useAuth();
  const { dispatch } = usePost();
  const { api } = useAxios();
  const { state: profile } = useProfile();

  const user = profile?.user ?? auth?.user;

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();

  const handlePostSubmit = async (formData) => {
    dispatch({ type: actions.post.DATA_FETCHING });

    try {
      const response = await api.post(
        `${import.meta.env.VITE_BASE_SERVER_URL}/posts`,
        { formData }
      );

      if (response.status === 200) {
        dispatch({ type: actions.post.DATA_CREATED, data: response.data });

        // close this ui
        onCreate();
      }
    } catch (error) {
      setError("root.random", {
        type: "random",
        message: `Something went wrong: ${error.message} `,
      });
    }
  };

  return (
    <>
      <div className="card relative">
        <h6 className="mb-3 text-center text-lg font-bold lg:text-xl">
          Create Post
        </h6>

        <form onSubmit={handleSubmit(handlePostSubmit)}>
          <div className="mb-3 flex items-center justify-between gap-2 lg:mb-6 lg:gap-4">
            <div className="flex items-center gap-3">
              <img
                className="max-w-10 max-h-10 rounded-full lg:max-h-[58px] lg:max-w-[58px]"
                src={`${import.meta.env.VITE_BASE_SERVER_URL}/${user?.avatar}`}
                alt="avatar"
              />
              <div>
                <h6 className="text-lg lg:text-xl">
                  {user?.firstName} {user?.lastName}
                </h6>
                <span className="text-sm text-gray-400 lg:text-base">
                  Public
                </span>
              </div>
            </div>
            <label
              className="btn-primary cursor-pointer !text-gray-100"
              htmlFor="photo"
            >
              <img src={AddPhoto} alt="Add Photo" />
              Add Photo
            </label>
            <input type="file" name="photo" id="photo" className="hidden" />
          </div>

          <Field label="" error={errors.content}>
            <textarea
              {...register("content", {
                required: "Adding some text is Mandatory",
              })}
              name="content"
              id="content"
              placeholder="Share your thoughts..."
              className="h-[120px] w-full bg-transparent focus:outline-none lg:h-[160px]"
            />
          </Field>

          <div className="border-t border-[#3F3F3F] pt-4 lg:pt-6">
            <button
              className="auth-input bg-lwsGreen font-bold text-deepDark transition-all hover:opacity-90 border w-full"
              type="submit"
            >
              Post
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default PostEntry;
