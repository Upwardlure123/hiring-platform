// src/pages/Candidates.js
import React from "react";
import { useParams } from "react-router-dom";
import { Box, Typography, Paper, Button, Grid } from "@mui/material";

function Candidates() {
  const { jobId } = useParams();

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Candidates for Job {jobId}
      </Typography>

      <Grid container spacing={3}>
        {[1, 2, 3].map((candidate) => (
          <Grid item xs={12} key={candidate}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="h6">Candidate Name {candidate}</Typography>
              <Typography variant="body1">
                Application Date: 2024-11-01
              </Typography>
              <Typography variant="body1">Status: Under Review</Typography>
              <Button size="small" variant="contained" sx={{ mt: 2 }}>
                View Details
              </Button>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default Candidates;
