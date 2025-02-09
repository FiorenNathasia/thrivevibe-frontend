function Analytics({ upvotes, downvotes }) {
  if (!upvotes && !downvotes) {
    return <div>No votes to display!</div>;
  }
  const totalVotes = upvotes + downvotes;
  const upvotePercentage = (upvotes / totalVotes) * 100;
  const downvotePercentage = (downvotes / totalVotes) * 100;
  return (
    <>
      <div className="analytics">
        <p>
          Upvotes: {upvotePercentage}% vs Downvotes: {downvotePercentage}%
        </p>
      </div>
    </>
  );
}
export default Analytics;
