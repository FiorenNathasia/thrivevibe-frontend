import { useState } from "react";
import {
  Modal,
  Box,
  TextField,
  Typography,
  Button,
  IconButton,
  CircularProgress,
  Alert,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

function AddVideoModal({ onClose, open, onSubmit }) {
  const [url, setUrl] = useState("");
  const [prompt, setPrompt] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmitVideo = async () => {
    setIsSubmitting(true);
    try {
      await onSubmit(url, prompt);
      handleClose();
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Something went wrong";
      setError(errorMessage);
    }
    setIsSubmitting(false);
  };

  const handleClose = () => {
    onClose();
    setError(null);
    setUrl("");
    setPrompt("");
    setIsSubmitting(false);
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          maxWidth: 400,
          width: { xs: "100%" },
          backgroundColor: "background.default",
          padding: 2,
        }}
      >
        <Box display="flex" flexDirection="row" justifyContent="space-between">
          <Typography variant="h5">New Video</Typography>
          <IconButton onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </Box>

        {error && (
          <Alert
            severity="error"
            sx={{
              width: "100%",
              mt: 2,
              mb: 3,
            }}
          >
            {error}
          </Alert>
        )}

        <TextField
          fullWidth
          label="Video URL"
          variant="outlined"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          autoComplete="email"
        />
        <TextField
          fullWidth
          label="Prompt"
          variant="outlined"
          margin="normal"
          multiline
          minRows={3}
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />
        <Button
          variant="contained"
          onClick={handleSubmitVideo}
          size="small"
          disabled={!url || !prompt}
        >
          Submit
          {isSubmitting && (
            <CircularProgress sx={{ marginLeft: 1 }} size="1rem" />
          )}
        </Button>
      </Box>
    </Modal>
  );
}
export default AddVideoModal;
