import UserVideoCard from "../UserVideoCard/UserVideoCard";

function VideoList({ videos }) {
  return (
    <>
      <div className="workoutlist">
        <div className="workoulist__container">
          {videos.map((video) => (
            <ul key={video.id}>
              <UserVideoCard
                id={video.id}
                url={video.url}
                prompt={video.prompt}
              />
            </ul>
          ))}
        </div>
      </div>
    </>
  );
}
export default VideoList;
