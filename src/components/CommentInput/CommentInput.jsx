import axios from "axios";

function CommentInput() {
  return (
    <div className="commentinput">
      <input
        className="commentinput__box"
        type="text"
        // value={comment}
        placeholder="Please enter comment"
        // onChange={(e) => setComment(e.target.value)}
      />
      <div className="commentinput__button--wrapper">
        <button>submit</button>
      </div>
      {/* {error && <div className="commentinput__message">{error}</div>} */}
    </div>
  );
}

export default CommentInput;
