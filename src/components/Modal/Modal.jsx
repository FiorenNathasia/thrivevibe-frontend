import { useState } from "react";
import "./Modal.scss";
import axios from "axios";

function Modal({ closeModal, fetchVideos }) {
  const [url, setUrl] = useState("");
  const [prompt, setPrompt] = useState("");

  const handleSubmit = async () => {
    const token = localStorage.getItem("accessToken");
    const newVideo = {
      url,
      prompt,
    };
    try {
      await axios.post("http://localhost:8181/api/videos/newvideo", newVideo, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      closeModal();
      fetchVideos();
    } catch (error) {}
  };
  return (
    <>
      <div className="modal__background">
        <div className="modal__container">
          <button className="modal__exit" onClick={() => closeModal()}>
            X
          </button>
          <div className="modal__title">
            <h1>Add new workout</h1>
          </div>
          <div className="modal__body">
            <input
              className="modal__input"
              type="url"
              value={url}
              placeholder="video url"
              onChange={(e) => setUrl(e.target.value)}
            ></input>
            <input
              className="modal__input"
              type="text"
              value={prompt}
              placeholder="prompt"
              onChange={(e) => setPrompt(e.target.value)}
            ></input>
          </div>
          <div className="modal__footer">
            <button className="modal__submits" onClick={handleSubmit}>
              Submit
            </button>
            <button onClick={() => closeModal()}>Cancel</button>
          </div>
        </div>
      </div>
    </>
  );
}
export default Modal;
