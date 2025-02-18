import { Link } from "react-router-dom";
import ReactPlayer from "react-player";
import { useState } from "react";
import axios from "axios";

function UserVideoCard({ id, url, prompt, fetchVideos }) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    const token = localStorage.getItem("accessToken");
    try {
      const deletedVideo = await axios.delete(
        `http://localhost:8181/api/videos/${id}`,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      fetchVideos();
    } catch (error) {
      console.log(error);
    }
    setIsDeleting(false);
  };
  return (
    <>
      <Link to={`/video/${id}`}>
        <ReactPlayer url={url} />
        <p>{prompt}</p>
      </Link>
      <button onClick={handleDelete} disabled={isDeleting}>
        {isDeleting ? "Deleting..." : "Delete"}
      </button>
    </>
  );
}
export default UserVideoCard;
