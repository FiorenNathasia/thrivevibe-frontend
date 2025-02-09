import { Link } from "react-router-dom";
import ReactPlayer from "react-player";

function VideoCard({ id, url, prompt }) {
  return (
    <>
      <Link to={`/video/${id}`}></Link>
      <ReactPlayer url={url} />
      <p>{prompt}</p>
    </>
  );
}
export default VideoCard;
