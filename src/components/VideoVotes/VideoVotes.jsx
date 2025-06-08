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
                { name: "Upvotes", value: upvote, color: "#5d3fd3" },
                { name: "Downvotes", value: downvote, color: "#FFB677" },
              ]}
              dataKey="value"
              nameKey="name"
              innerRadius={60}
              outerRadius={80}
            >
              <Cell fill="#5d3fd3" />
              <Cell fill="#FFB677" />
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
