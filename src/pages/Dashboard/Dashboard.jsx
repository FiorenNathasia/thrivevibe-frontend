import { useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import axios from "axios";
import AddVideoModal from "../../components/AddVideoModal/AddVideoModal";
import {
  Box,
  Container,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  CardActionArea,
  LinearProgress,
  IconButton,
} from "@mui/material";
import { Masonry } from "@mui/lab";
import Header from "../../components/Header/Header";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import DeleteIcon from "@mui/icons-material/Delete";

function Dashboard() {
  const [videoList, setVideoList] = useState([]);
  const [user, setUser] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const fetchVideoList = async () => {
    const token = localStorage.getItem("accessToken");
    const { data } = await axios.get(
      `${import.meta.env.VITE_API_URL}/api/videos`,
      {
        headers: { Authorization: "Bearer " + token },
      }
    );
    setVideoList(data.data);
  };

  const fetchUser = async () => {
    const token = localStorage.getItem("accessToken");
    const { data } = await axios.get(
      `${import.meta.env.VITE_API_URL}/api/user/`,
      {
        headers: { Authorization: "Bearer " + token },
      }
    );
    setUser(data.data);
  };

  const fetchPageData = async () => {
    try {
      await fetchVideoList();
      await fetchUser();
      setIsLoading(false);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchPageData();
  }, []);

  const handleSubmitVideo = async (url, prompt) => {
    const token = localStorage.getItem("accessToken");
    const newVideo = { url, prompt };
    await axios.post(
      `${import.meta.env.VITE_API_URL}/api/videos/newvideo`,
      newVideo,
      {
        headers: { Authorization: "Bearer " + token },
      }
    );
    await fetchVideoList();
    setOpenModal(false);
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    const token = localStorage.getItem("accessToken");
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/api/videos/${id}`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      await fetchVideoList();
    } catch (error) {
      console.log(error);
    }
    setIsDeleting(false);
  };

  if (isLoading) return <LinearProgress />;

  return (
    <>
      <Header />
      {isLoading && <LinearProgress />}
      <Container sx={{ mt: 6 }}>
        <Box
          display="flex"
          flexDirection={{ xs: "column", sm: "row" }}
          justifyContent="space-between"
          alignItems="flex-start"
          mb={3}
          b
        >
          <Box
            sx={{
              mt: { xs: 1, sm: 4 },
              gap: { xs: 1, sm: 2 },
              color: "#3333333",
            }}
          >
            <Typography variant="h4">Welcome back, {user.firstName}</Typography>
            <Typography variant="h5">My Videos</Typography>
          </Box>
          <Button
            onClick={() => setOpenModal(true)}
            startIcon={<AddCircleIcon />}
            sx={{ mt: { xs: 2, sm: 0 }, color: "#5d3fd3" }}
          >
            Add New
          </Button>
        </Box>

        <Masonry columns={{ xs: 1, sm: 2, md: 3 }} spacing={2}>
          {videoList.map((video) => {
            const totalVotes = video.upvote + video.downvote;
            return (
              <CardActionArea
                key={video.id}
                component={RouterLink}
                to={`/video/${video.id}`}
              >
                <Card>
                  <CardMedia
                    component="img"
                    image={video.thumbnail}
                    alt="thumbnail"
                  />
                  <CardContent>
                    <Typography>{video.prompt}</Typography>
                    <Typography>
                      {totalVotes ? `${totalVotes} votes` : "No votes"}
                    </Typography>
                  </CardContent>
                </Card>
                <IconButton
                  variant="contained"
                  color="neutral"
                  sx={{ mr: "auto" }}
                >
                  <DeleteIcon
                    variant="contained"
                    onClick={handleDelete}
                    disabled={isDeleting}
                    sx={{ fontSize: "1.5rem", color: "#919192" }}
                  >
                    {isDeleting ? "Deleting..." : "Delete"}
                  </DeleteIcon>
                </IconButton>
              </CardActionArea>
            );
          })}
        </Masonry>

        <AddVideoModal
          onClose={() => setOpenModal(false)}
          onSubmit={handleSubmitVideo}
          open={openModal}
        />
      </Container>
    </>
  );
}

export default Dashboard;
