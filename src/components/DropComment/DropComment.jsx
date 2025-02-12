// import "./DropComment.scss";
import CommentInput from "../CommentInput/CommentInput";

function DropComment() {
  return (
    <div className="dropcomment">
      <div className="dropcomment__container">
        <div className="dropcomment__trigger">
          <div className="dropcomment__menu">
            <button>
              Drop
              <button>Add comment</button>
            </button>
            {
              <div className="dropcomment__dropdown">
                <CommentInput />
              </div>
            }
          </div>
        </div>
      </div>
    </div>
  );
}

export default DropComment;
