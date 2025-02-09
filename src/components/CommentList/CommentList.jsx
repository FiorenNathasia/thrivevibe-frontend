function CommentList({ comments }) {
  if (!comments || comments.length === 0) {
    return <div>No comments to display!</div>;
  }
  return (
    <>
      <div>
        {" "}
        {comments.map((comment) => (
          <ul key={comment.id}>
            <li style={{ color: "white" }}>{comment.comments}</li>
          </ul>
        ))}{" "}
      </div>
    </>
  );
}
export default CommentList;
