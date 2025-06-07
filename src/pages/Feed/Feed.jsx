import { useState, useEffect } from "react";
import TinderCard from "react-tinder-card";
import ReactPlayer from "react-player";
import { Box, LinearProgress, Typography, IconButton } from "@mui/material";
import "./Feed.css";
import axios from "axios";
import Lottie from "lottie-react";
import checkAnimation from "../../assets/animations/checkmark.json";
import crossAnimation from "../../assets/animations/crossmark.json";
import Header from "../../components/Header/Header";
import AddCommentIcon from "@mui/icons-material/AddComment";
import AddCommentPopover from "../../components/AddCommentPopover/AddCommentPopover";

export default function Feed() {
  const [videoList, setVideoList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAnimating, setIsAnimating] = useState(false);
  const [videoIdForComment, setVideoIdForComment] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);

  const fetchFeedList = async () => {
    const token = localStorage.getItem("accessToken");
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}//api/feed`,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      setVideoList(data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchFeedList();
  }, []);

  const handleSwipe = (direction, videoId) => {
    const token = localStorage.getItem("accessToken");
    if (direction === "right") {
      axios.put(
        `${import.meta.env.VITE_API_URL}/api/videos/${videoId}/upvote`,
        null,
        {
          headers: { Authorization: "Bearer " + token },
        }
      );
      setIsAnimating("check");
    } else if (direction === "left") {
      axios.put(
        `${import.meta.env.VITE_API_URL}/api/videos/${videoId}/downvote`,
        null,
        {
          headers: { Authorization: "Bearer " + token },
        }
      );
      setIsAnimating("cross");
    }

    setTimeout(() => {
      setIsAnimating(false);
    }, 1500);
  };

  const handleCommentClick = (event, videoId) => {
    setAnchorEl(event.currentTarget);
    setVideoIdForComment(videoId);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
    setVideoIdForComment(null);
  };

  const handleCommentSubmit = (text) => {
    const token = localStorage.getItem("accessToken");
    axios.post(
      `${
        import.meta.env.VITE_API_URL
      }/api/comments/${videoIdForComment}/comment`,
      { comments: text },
      {
        headers: { Authorization: "Bearer " + token },
      }
    );
  };

  if (isLoading) {
    return <LinearProgress />;
  }

  return (
    <>
      <Header />
      <Box
        sx={{
          width: "100%",
          height: "100vh",
          overflow: "hidden",
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          position: "relative",
          pt: {
            xs: 6,
            md: "20vh",
          },
        }}
      >
        <Box
          sx={{
            display: { xs: "none", md: "block" },
            width: 300,
            height: 300,
          }}
        >
          {isAnimating === "cross" && (
            <Lottie
              loop={false}
              style={{ width: 300, height: 300 }}
              animationData={crossAnimation}
            />
          )}
        </Box>

        <Box
          sx={{
            position: "relative",
            width: "90vw",
            maxWidth: 320,
            zIndex: 2,
            justifyContent: "center",
            display: "flex",
          }}
        >
          {videoList.map((video, index) => (
            <TinderCard
              className="swipe"
              key={video.id}
              onSwipe={(dir) => handleSwipe(dir, video.id)}
              preventSwipe={["up", "down"]}
            >
              <Box
                sx={{
                  overflow: "hidden",
                  display: "flex",
                  flexDirection: "column",
                  boxShadow: index === 0 ? 1 : 0,
                  backgroundColor: "background.default",
                  padding: 2,
                  width: "100%",
                  mb: 1,
                }}
              >
                <ReactPlayer
                  url={video.url}
                  width="100%"
                  height={350}
                  controls
                />

                <Box
                  minHeight={100}
                  display="flex"
                  flexDirection="column"
                  justifyContent="space-between"
                >
                  <Typography>{video.prompt}</Typography>
                  <Box display="flex" justifyContent="flex-end">
                    <IconButton
                      onClick={(e) => handleCommentClick(e, video.id)}
                    >
                      <AddCommentIcon />
                    </IconButton>
                  </Box>
                </Box>
              </Box>
            </TinderCard>
          ))}
        </Box>

        <Box
          sx={{
            display: { xs: "none", md: "block" },
            width: 300,
            height: 300,
          }}
        >
          {isAnimating === "check" && (
            <Lottie
              loop={false}
              animationData={checkAnimation}
              style={{ width: 300, height: 300 }}
            />
          )}
        </Box>

        <AddCommentPopover
          onClose={handlePopoverClose}
          anchorEl={anchorEl}
          onCommentSubmit={handleCommentSubmit}
        />
      </Box>
    </>
  );
}
