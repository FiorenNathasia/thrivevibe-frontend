import ReactPlayer from "react-player";
import DropComment from "../DropComment/DropComment";

function SwipeCard() {
  return (
    <>
      <div className="feed__wrapper">
        <div className="feed__cross"></div>

        <div className="feed__cardcontainer">
          <div className="feed__cardshadow">
            <div className="swipecard">
              <ReactPlayer />
              <h3>prompt</h3>
              <DropComment />
            </div>
          </div>
        </div>

        <div className="feed__check"></div>
      </div>
    </>
  );
}

export default SwipeCard;
