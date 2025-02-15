import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import VideoList from "../../components/VideoList/VideoList";
import Modal from "../../components/Modal/Modal";

function Dashboard() {
  const [videoList, setVideoList] = useState([]);
  const [user, setUser] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const navigate = useNavigate();

  const fetchVideoList = async () => {
    const token = localStorage.getItem("accessToken");
    try {
      const { data } = await axios.get("http://localhost:8181/api/videos/", {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      setVideoList(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchUser = async () => {
    const token = localStorage.getItem("accessToken");
    try {
      const { data } = await axios.get("http://localhost:8181/api/user/", {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      setUser(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchPageData = async () => {
    await fetchVideoList();
    await fetchUser();
    // setIsLoading(false);
  };

  useEffect(() => {
    fetchPageData();
  }, []);

  const logout = () => {
    localStorage.removeItem("accessToken");
    navigate("/login");
  };

  const feed = () => {
    navigate("/feed");
  };
  return (
    <>
      <div>Header</div>
      <div className="dashboard">
        <div className="dashboard__container">
          <p>Welcome back {user?.firstName}</p>
          <button
            className="dashboard__modal"
            onClick={() => setOpenModal(true)}
          >
            OPEN
          </button>
          {openModal && (
            <Modal
              closeModal={() => setOpenModal(false)}
              fetchVideos={fetchVideoList}
            />
          )}
          <div className="dashboard__videolist">
            <VideoList videos={videoList} />
          </div>
          <button onClick={logout}>Logout</button>
          <button onClick={feed}>Feed</button>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
