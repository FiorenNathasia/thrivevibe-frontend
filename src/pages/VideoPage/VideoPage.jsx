import ReactPlayer from "react-player";
import {
  Box,
  Container,
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
  useTheme,
  useMediaQuery,
  LinearProgress,
} from "@mui/material";
import { PieChart, Pie, Cell, Legend, Tooltip } from "recharts";
import Header from "../../components/Header/Header";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import dayjs from "dayjs";

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

  const totalVotes = video.upvote + video.downvote;

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
        >
          {!isMobile && (
            <Box
              sx={{
                padding: 2,
                width: 320,
                display: "flex",
                justifyContent: "center",
                border: 1,
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
                border: 1,
                width: "100%",
              }}
            >
              <Typography variant="h5">{video.prompt}</Typography>
            </Box>

            <Box
              sx={{
                padding: 2,
                border: 1,
                flexGrow: 1,
              }}
            >
              <Typography variant="h5">Votes</Typography>

              <Typography>
                {totalVotes ? `Total votes: ${totalVotes}` : "No votes"}
              </Typography>
              {totalVotes > 0 && (
                <Box bgcolor="blue" display="flex" justifyContent="center">
                  <PieChart width={280} height={190}>
                    <Pie
                      data={[
                        { name: "Upvotes", value: video.upvote },
                        { name: "Downvotes", value: video.downvote },
                      ]}
                      dataKey="value"
                      nameKey="name"
                      innerRadius={60}
                      outerRadius={80}
                    >
                      <Cell fill="#82ca9d" />
                      <Cell fill="#8dd1e1" />
                    </Pie>
                    <Tooltip />
                    <Legend
                      layout="vertical"
                      align="left"
                      verticalAlign="middle"
                      height={36}
                    />
                  </PieChart>
                </Box>
              )}
            </Box>
          </Box>
        </Box>

        <Box border={1} padding={2} width={{ sm: 680, xs: "100%" }}>
          <Typography variant="h5">Comments</Typography>
          {comments.length ? (
            <List>
              {comments.map((comment, index) => (
                <React.Fragment key={comment.id}>
                  <ListItem alignItems="flex-start">
                    <ListItemText
                      primary={
                        <Typography variant="body1">
                          {comment.comments}
                        </Typography>
                      }
                      secondary={
                        <Typography
                          variant="caption"
                          color="text.secondary"
                          component="span"
                        >
                          {`${comment.first_name} ${
                            comment.last_name
                          } • ${dayjs(comment.created_at).format(
                            "h:mm A • DD MMM YY"
                          )}`}
                        </Typography>
                      }
                    />
                  </ListItem>
                  {index < comments.length - 1 && <Divider component="li" />}
                </React.Fragment>
              ))}
            </List>
          ) : (
            <Typography>No Comments</Typography>
          )}
        </Box>
      </Container>
    </>
  );
}

export default VideoPage;
