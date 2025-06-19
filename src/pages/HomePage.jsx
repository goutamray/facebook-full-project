import { useEffect, useReducer } from "react";

import { initialState, postReducer } from "../reducers/PostReducers";
import useAxios from "../hooks/useAxios";
import PostList from "../components/posts/PostList";
import { actions } from "../actions";

const HomePage = () => {
  const [state, dispatch] = useReducer(postReducer, initialState);

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
        console.log(error);

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
      <PostList posts={state.posts} />
    </div>
  );
};

export default HomePage;
