import { useEffect } from "react";

import useAxios from "../hooks/useAxios";
import PostList from "../components/posts/PostList";
import { actions } from "../actions";
import { usePost } from "../hooks/usePost";
import NewPosts from "../components/posts/NewPosts";

const HomePage = () => {
  const { state, dispatch } = usePost();

  const { api } = useAxios();

  useEffect(() => {
    dispatch({ type: actions.post.DATA_FETCHING });

    const fetchPost = async () => {
      try {
        const res = await api.get(
          `${import.meta.env.VITE_BASE_SERVER_URL}/posts`
        );

        if (res.status === 200) {
          dispatch({ type: actions.post.DATA_FETCHED, data: res.data });
        }
      } catch (error) {
        dispatch({
          type: actions.post.DATA_FETCHED_ERROR,
          error: error.message,
        });
      }
    };

    fetchPost();
  }, [api]);

  if (state?.loading) {
    return <div>Loading....</div>;
  }
  if (state?.error) {
    return <div>Error in fetching posts....</div>;
  }
  return (
    <div>
      <NewPosts />
      <PostList posts={state.posts} />
    </div>
  );
};

export default HomePage;
