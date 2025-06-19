const PostBody = ({ poster, content }) => {
  const posterUrl = poster
    ? `${import.meta.env.VITE_BASE_SERVER_URL}/${poster}`
    : null;

  return (
    <>
      <div className="border-b border-[#3F3F3F] py-4 lg:py-5 lg:text-xl">
        <div className="flex items-center justify-center overflow-hidden">
          {posterUrl && (
            <div className="flex items-center justify-center overflow-hidden mb-4">
              <img
                className="max-w-full max-h-[500px] object-contain"
                src={posterUrl}
                alt="Post poster"
              />
            </div>
          )}
        </div>
        <p>{content ?? "No Content Available"}</p>
      </div>
    </>
  );
};

export default PostBody;
