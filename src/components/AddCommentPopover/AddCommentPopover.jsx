import { useState } from "react";
import { Box, Popover, TextField, Button, Alert } from "@mui/material";

function AddCommentPopover({ onCommentSubmit, onClose, anchorEl }) {
  const [commentText, setCommentText] = useState("");
  const [error, setError] = useState(null);

  const handleCommentSubmit = async () => {
    try {
      await onCommentSubmit(commentText);
      setCommentText("");
      handleClose();
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || "Failed to submit comment";
      setError(errorMessage);
    }
  };

  const handleClose = () => {
    onClose();
    setCommentText("");
    setError(null);
  };

  return (
    <Popover
      open={!!anchorEl}
      anchorEl={anchorEl}
      onClose={handleClose}
      anchorOrigin={{
        vertical: "top",
        horizontal: "left",
      }}
      transformOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
    >
      <Box sx={{ p: 2, width: { xs: "100%", sm: 250 } }}>
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}
        <TextField
          fullWidth
          multiline
          minRows={3}
          placeholder="Your comment..."
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
        />
        <Button
          variant="contained"
          size="small"
          sx={{ mt: 1 }}
          onClick={handleCommentSubmit}
          disabled={!commentText}
        >
          Send
        </Button>
      </Box>
    </Popover>
  );
}

export default AddCommentPopover;
