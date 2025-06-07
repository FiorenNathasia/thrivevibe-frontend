import ReactPlayer from "react-player";
import {
  Box,
  Container,
  Typography,
  useTheme,
  useMediaQuery,
  LinearProgress,
} from "@mui/material";
import Header from "../../components/Header/Header";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import VideoVotes from "../../components/VideoVotes/VideoVotes";
import VideoComments from "../../components/VideoComments/VideoComments";

function VideoPage() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [video, setVideo] = useState(null);
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();

  const fetchData = async () => {
    const token = localStorage.getItem("accessToken");
    try {
      const videoResponse = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/videos/${id}`,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      const commentsResponse = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/comments/${id}/comments`,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      setVideo(videoResponse.data.data);
      setComments(commentsResponse.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (isLoading) return <LinearProgress />;

  return (
    <>
      <Header />
      <Container
        sx={{
          mt: 4,
          justifyContent: "center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {isMobile && <ReactPlayer url={video.url} width="100%" />}
        <Box
          display="flex"
          flexDirection="row"
          width={isMobile ? "100%" : null}
          marginBottom={2}
          marginTop={isMobile ? 2 : null}
        >
          {!isMobile && (
            <Box
              sx={{
                padding: 2,
                width: 320,
                display: "flex",
                justifyContent: "center",
                boxShadow: 3,
                borderRadius: 3,
                marginRight: 2,
              }}
            >
              <ReactPlayer url={video.url} width={250} height={360} controls />
            </Box>
          )}

          <Box
            display="flex"
            flexDirection="column"
            width={{ sm: 360, xs: "100%" }}
          >
            <Box
              sx={{
                padding: 2,
                boxShadow: 2,
                width: "100%",
                borderRadius: 3,
                marginBottom: 2,
              }}
            >
              <Typography variant="h5">{video.prompt}</Typography>
            </Box>

            <Box
              sx={{
                padding: 2,
                boxShadow: 2,
                flexGrow: 1,
                borderRadius: 3,
              }}
            >
              <VideoVotes upvote={video.upvote} downvote={video.downvote} />
            </Box>
          </Box>
        </Box>

        <Box
          boxShadow={2}
          padding={2}
          width={{ sm: 700, xs: "100%" }}
          borderRadius={3}
        >
          <VideoComments comments={comments} />
        </Box>
      </Container>
    </>
  );
}

export default VideoPage;
