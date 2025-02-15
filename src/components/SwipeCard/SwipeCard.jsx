import axios from "axios";
import TinderCard from "react-tinder-card";
import ReactPlayer from "react-player";
import DropComment from "../DropComment/DropComment";
import { useState, useEffect, useRef } from "react";

function SwipeCard() {
  const [videoList, setVideoList] = useState(null);
  const [swipeDirection, setSwipeDirection] = useState(null);
  const lastDirectionRef = useRef();

  const fetchFeedList = async () => {
    const token = localStorage.getItem("accessToken");
    try {
      const { data } = await axios.get("http://localhost:8181/api/feed/", {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      setVideoList(data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchPageData = async () => {
    await fetchFeedList();
    // setIsLoading(false);
  };

  useEffect(() => {
    fetchPageData();
  }, []);

  const swiped = (direction, videoId) => {
    console.log("removing: " + videoId);
    lastDirectionRef.current = direction;
    setSwipeDirection(direction);

    //     if (direction === "right") {
    //       setIsAnimating("check");
    //     } else if (direction === "left") {
    //       setIsAnimating("cross");
    //     }

    //     setTimeout(() => {
    //       setIsAnimating(false);
    //     }, 1500);
  };

  const outOfFrame = async (videoId) => {
    console.log(videoId + " left the screen!");

    const lastDirection = lastDirectionRef.current;

    if (lastDirection === "right") {
      const token = localStorage.getItem("accessToken");
      try {
        await axios.put(
          `http://localhost:8181/api/videos/${videoId}/upvote`,
          { voteType: "upvote" },
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );
        console.log("Upvoting video:", videoId);
      } catch (error) {
        console.error("Error while upvoting:", error);
      }
    } else if (lastDirection === "left") {
      try {
        const token = localStorage.getItem("accessToken");
        await axios.put(
          `http://localhost:8181/api/videos/${videoId}/downvote`,
          { voteType: "downvote" },
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );
        console.log("Downvoting video:", videoId);
      } catch (error) {
        console.error("Error while downvoting:", error);
      }
    }
  };
  return (
    <>
      <div className="feed__wrapper">
        <div className="feed__cross"></div>
        <div className="feed__cardcontainer">
          {videoList &&
            videoList.map((video, index) => (
              <TinderCard
                key={video.id}
                onSwipe={(direction) => swiped(direction, video.id)}
                onCardLeftScreen={() => outOfFrame(video.id)}
              >
                <div className="feed__cardshadow">
                  <div className="swipecard">
                    <ReactPlayer url={video.url} />
                    <h3>{video.prompt}</h3>
                    <DropComment video={video} />
                  </div>
                </div>
              </TinderCard>
            ))}
        </div>

        <div className="feed__check"></div>
      </div>
    </>
  );
}

export default SwipeCard;
