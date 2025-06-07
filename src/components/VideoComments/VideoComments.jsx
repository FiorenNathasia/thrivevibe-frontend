import React from "react";
import {
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
} from "@mui/material";
import dayjs from "dayjs";

function VideoComments({ comments }) {
  return (
    <>
      <Typography variant="h5">Comments</Typography>
      {comments.length ? (
        <List>
          {comments.map((comment, index) => (
            <React.Fragment key={comment.id}>
              <ListItem alignItems="flex-start">
                <ListItemText
                  primary={
                    <Typography variant="body1">{comment.comments}</Typography>
                  }
                  secondary={
                    <Typography
                      variant="caption"
                      color="text.secondary"
                      component="span"
                    >
                      {`${comment.first_name} ${comment.last_name} • ${dayjs(
                        comment.created_at
                      ).format("h:mm A • DD MMM YY")}`}
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
    </>
  );
}

export default VideoComments;
