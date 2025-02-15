// import "./DropComment.scss";
import { useState } from "react";
import CommentInput from "../CommentInput/CommentInput";

function DropComment({ video }) {
  const [isDropped, setIsDropped] = useState(false);
  const handleButtonClick = () => {
    setIsDropped(!isDropped);
  };
  return (
    <div className="dropcomment">
      <div className="dropcomment__container">
        <div className="dropcomment__trigger">
          <div className="dropcomment__menu">
            <button onClick={handleButtonClick}>Add comment</button>

            {isDropped && (
              <div className="dropcomment__dropdown">
                <CommentInput
                  videoId={video.id}
                  closeComment={() => setIsDropped(false)}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DropComment;
