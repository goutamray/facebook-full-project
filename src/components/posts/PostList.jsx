import PostCard from "./PostCard";

const PostList = ({ posts }) => {
  return (
    <>
      {posts?.length !== 0 &&
        posts?.map((post) => {
          return <PostCard key={post.id} post={post} />;
        })}
    </>
  );
};

export default PostList;
