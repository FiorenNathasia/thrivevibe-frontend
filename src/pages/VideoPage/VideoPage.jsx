import ReactPlayer from "react-player";
import {
  Box,
  Container,
  Typography,
  useTheme,
  useMediaQuery,
  LinearProgress,
  CircularProgress,
} from "@mui/material";
import Header from "../../components/Header/Header";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import VideoVotes from "../../components/VideoVotes/VideoVotes";
import VideoComments from "../../components/VideoComments/VideoComments";
import Summary from "../../components/Summary/Summary";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";

function VideoPage() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [video, setVideo] = useState(null);
  const [comments, setComments] = useState([]);
  const [summary, setSummary] = useState("");
  const [updatedAt, setUpdatedAt] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSummaryLoading, setIsSummmaryLoading] = useState(true);
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

  const fetchSummary = async () => {
    const token = localStorage.getItem("accessToken");
    try {
      setIsSummmaryLoading(true);
      const summaryResponse = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/videos/${id}/summary`,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      console.log(
        "Summary request URL:",
        `${import.meta.env.VITE_API_URL}/api/videos/${id}/summary`
      );
      setSummary(summaryResponse.data.data);
      setUpdatedAt(summaryResponse.data.updated_at);
      setIsSummmaryLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
    fetchSummary();
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

            {isMobile &&
              (isSummaryLoading ? (
                <Box
                  boxShadow={2}
                  padding={2}
                  width="100%"
                  borderRadius={3}
                  marginBottom={2}
                >
                  <Box display="flex" alignItems="center" gap={1}>
                    <Typography variant="h5">Summary</Typography>
                    <AutoAwesomeIcon sx={{ fontSize: 30, color: "#5d3fd3" }} />
                  </Box>
                  <CircularProgress
                    sx={{ color: "#FFB677", margin: 3 }}
                    size="3rem"
                  />
                </Box>
              ) : (
                summary && (
                  <Box
                    boxShadow={2}
                    padding={2.5}
                    width="100%"
                    borderRadius={3}
                    marginBottom={2}
                  >
                    <Box display="flex" alignItems="center" gap={1}>
                      <Typography variant="h5">Summary</Typography>
                      <AutoAwesomeIcon
                        sx={{ fontSize: 30, color: "#5d3fd3" }}
                      />
                    </Box>
                    <Box display="flex" flexDirection="column" gap={1}>
                      <Summary summary={summary} />
                      <Box display="flex" alignItems="center">
                        <Box flexGrow={2} />
                        <Typography
                          variant="caption"
                          sx={{ fontStyle: "italic" }}
                        >
                          Last updated:
                        </Typography>
                        <Typography
                          variant="caption"
                          sx={{ fontStyle: "italic", mr: 1.5 }}
                        >
                          {updatedAt
                            ? new Date(updatedAt).toLocaleDateString()
                            : "N/A"}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                )
              ))}

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
        {isSummaryLoading ? (
          <Box
            boxShadow={2}
            padding={2}
            width={{ sm: 700, xs: "100%" }}
            borderRadius={3}
          >
            <Box display="flex" alignItems="center" gap={1}>
              <Typography variant="h5">Summary</Typography>
              <AutoAwesomeIcon sx={{ fontSize: 30, color: "#5d3fd3" }} />
            </Box>

            <CircularProgress
              sx={{ color: "#FFB677", margin: 3 }}
              size="3rem"
            />
          </Box>
        ) : (
          summary && (
            <Box
              boxShadow={2}
              padding={2.5}
              width={{ sm: 700, xs: "100%" }}
              borderRadius={3}
            >
              <Box display="flex" alignItems="center" gap={1}>
                <Typography variant="h5">Summary</Typography>
                <AutoAwesomeIcon sx={{ fontSize: 30, color: "#5d3fd3" }} />
              </Box>
              <Box display="flex" flexDirection="column" gap={1}>
                <Summary summary={summary} />
                <Box display="flex" alignItems="center">
                  <Box flexGrow={2} />
                  <Typography variant="caption" sx={{ fontStyle: "italic" }}>
                    Last updated:
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{ fontStyle: "italic", mr: 1.5 }}
                  >
                    {updatedAt
                      ? new Date(updatedAt).toLocaleDateString()
                      : "N/A"}
                  </Typography>
                </Box>
              </Box>
            </Box>
          )
        )}

        <Box
          boxShadow={2}
          padding={2}
          width={{ sm: 700, xs: "100%" }}
          borderRadius={3}
          maxHeight={300}
          overflow="auto"
          margin={2}
        >
          <VideoComments comments={comments} />
        </Box>
      </Container>
    </>
  );
}

export default VideoPage;
