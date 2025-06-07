import { Box, Typography } from "@mui/material";
import { PieChart, Pie, Cell, Legend, Tooltip } from "recharts";

function VideoVotes({ upvote, downvote }) {
  const totalVotes = upvote + downvote;

  return (
    <>
      <Typography variant="h5">Votes</Typography>

      <Typography>
        {totalVotes ? `Total votes: ${totalVotes}` : "No votes"}
      </Typography>
      {totalVotes > 0 && (
        <Box display="flex" justifyContent="center">
          <PieChart width={280} height={190}>
            <Pie
              data={[
                { name: "Upvotes", value: upvote },
                { name: "Downvotes", value: downvote },
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
    </>
  );
}

export default VideoVotes;
