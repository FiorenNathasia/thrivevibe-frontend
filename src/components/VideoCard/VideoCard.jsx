import ReactPlayer from "react-player";
function VideoCard({ video }) {
  return (
    <>
      <div className="videoCard">
        <ReactPlayer url={video.url} />
        <p>{video.prompt}</p>
      </div>
    </>
  );
}
export default VideoCard;
