import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import VideoList from "../../components/VideoList/VideoList";

function Dashboard() {
  const [videoList, setVideoList] = useState([]);
  const [user, setUser] = useState(null);

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

  return (
    <>
      <div>Header</div>
      <div className="dashboard">
        <div className="dashboard__container">
          <p>Welcome back {user?.firstName}</p>
          <div>Video Modal</div>
          <div className="dashboard__videolist">
            <VideoList videos={videoList} />
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
