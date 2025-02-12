import SwipeCard from "../../components/SwipeCard/SwipeCard";
// import Header from "../../components/Header/Header";

function Feed() {
  const token = localStorage.getItem("token");

  if (!token) {
    return <div>You must be logged in.</div>;
  }

  return (
    <>
      <Header />
      <div className="feed">
        <div className="feed__swipecontainer">
          <SwipeCard />
        </div>
      </div>
    </>
  );
}

export default Feed;
