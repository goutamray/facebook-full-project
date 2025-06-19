import { useProfile } from "./useProfile";

export const useAvater = (post) => {
  const { state } = useProfile();

  const isMe = post?.author?.id === state?.user?.id;

  const avatar = isMe ? `${state?.user?.avatar}` : `${post?.author?.avatar}`;

  const avatarUrl = `${import.meta.env.VITE_BASE_SERVER_URL}/${avatar}
  `;

  return { avatarUrl };
};
