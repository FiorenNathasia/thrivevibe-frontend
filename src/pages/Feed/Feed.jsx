import SwipeCard from "../../components/SwipeCard/SwipeCard";
import { useNavigate } from "react-router-dom";
// import Header from "../../components/Header/Header";

function Feed() {
  const navigate = useNavigate();
  const token = localStorage.getItem("accessToken");

  if (!token) {
    return <div>You must be logged in.</div>;
  }

  const dashboard = () => {
    navigate("/");
  };

  return (
    <>
      <div className="feed">
        <div className="feed__swipecontainer">
          <SwipeCard />
        </div>
        <button onClick={dashboard}>Dasboard</button>
      </div>
    </>
  );
}

export default Feed;
