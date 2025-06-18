import { useAuth } from "../hooks/useAuth";

const HomePage = () => {
  const { auth } = useAuth();

  console.log(auth);

  return (
    <div>
      <h2> Home </h2>
    </div>
  );
};

export default HomePage;
