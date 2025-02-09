import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Analytics from "../../components/Analytics/Analytics";
import VideoCard from "../../components/VideoCard/VideoCard";
import CommentList from "../../components/CommentList/CommentList";

function VideoPage() {
  const [video, setVideo] = useState(null);
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();

  const fetchData = async () => {
    const token = localStorage.getItem("accessToken");
    try {
      const videoResponse = await axios.get(
        `http://localhost:8181/api/videos/${id}`,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      const commentsResponse = await axios.get(
        `http://localhost:8181/api/comments/${id}/comments`,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      setVideo(videoResponse.data.data);
      console.log(videoResponse);
      setComments(commentsResponse.data);
      console.log(commentsResponse);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const back = () => {
    navigate("/");
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div>HEADER</div>
      <div className="videopage">
        <button onClick={back}>Back</button>
        <div className="videopage__container">
          <VideoCard video={video} />
          <div className="videopage__info">
            <Analytics upvotes={video.upvote} downvotes={video.downvote} />
            <CommentList comments={comments} />
          </div>
        </div>
      </div>
    </>
  );
}
export default VideoPage;
