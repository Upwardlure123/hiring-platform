import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Box, Typography, Paper, Button, Grid } from "@mui/material";
import candidatesData from "../data/candidates.json";

function Candidates() {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const [candidates, setCandidates] = useState([]);

  useEffect(() => {
    const savedCandidates = JSON.parse(localStorage.getItem("candidates")) || candidatesData;
    setCandidates(savedCandidates);
  }, []);

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Candidates for Job {jobId}
      </Typography>

      <Grid container spacing={3}>
        {candidates.map((candidate) => (
          <Grid item xs={12} key={candidate.id}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="h6">{candidate.name}</Typography>
              <Typography variant="body1">Application Date: {candidate.applicationDate}</Typography>
              <Typography variant="body1">Status: {candidate.status}</Typography>
              <Button
                size="small"
                variant="contained"
                sx={{ mt: 2 }}
                onClick={() => navigate(`/candidates/${candidate.id}`)}
              >
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
