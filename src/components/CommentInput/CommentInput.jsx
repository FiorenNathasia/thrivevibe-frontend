import axios from "axios";
import { useState } from "react";

function CommentInput({ videoId, closeComment }) {
  const [comment, setComment] = useState("");

  const handleSubmit = async () => {
    const token = localStorage.getItem("accessToken");
    const newComment = {
      comments: comment,
    };
    try {
      await axios.post(
        `http://localhost:8181/api/comments/${videoId}/newcomment`,
        newComment,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      closeComment();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="commentinput">
      <input
        className="commentinput__box"
        type="text"
        value={comment}
        placeholder="Please enter comment"
        onChange={(e) => setComment(e.target.value)}
      />
      <div className="commentinput__button--wrapper">
        <button onClick={handleSubmit}>submit</button>
      </div>
      {/* {error && <div className="commentinput__message">{error}</div>} */}
    </div>
  );
}

export default CommentInput;
