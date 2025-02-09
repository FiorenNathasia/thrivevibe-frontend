import { Link } from "react-router-dom";
import ReactPlayer from "react-player";

function UserVideoCard({ id, url, prompt }) {
  return (
    <>
      <Link to={`/video/${id}`}>
        <ReactPlayer url={url} />
        <p>{prompt}</p>
      </Link>
    </>
  );
}
export default UserVideoCard;
