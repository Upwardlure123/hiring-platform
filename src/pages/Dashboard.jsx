// src/pages/Dashboard.jsx
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Paper,
  Button,
  TextField,
  Grid,
  IconButton,
} from "@mui/material";
import { Delete } from "@mui/icons-material";
import JobContext from "../context/JobContext";

function Dashboard() {
  const { jobs, addOrUpdateJob, deleteJob } = useContext(JobContext);
  const [newJob, setNewJob] = useState({ title: "", description: "" });
  const [editIndex, setEditIndex] = useState(null);
  const navigate = useNavigate();

  const handleJobChange = (e) => {
    setNewJob({ ...newJob, [e.target.name]: e.target.value });
  };

  const handleAddOrUpdateJob = () => {
    addOrUpdateJob(newJob, editIndex);
    setNewJob({ title: "", description: "" });
    setEditIndex(null);
  };

  const handleEditJob = (index) => {
    setNewJob(jobs[index]);
    setEditIndex(index);
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Job Dashboard
      </Typography>

      {/* Job Form */}
      <Paper sx={{ p: 3, mb: 2 }}>
        <TextField
          label="Job Title"
          name="title"
          value={newJob.title}
          onChange={handleJobChange}
          sx={{ mr: 2 }}
        />
        <TextField
          label="Job Description"
          name="description"
          value={newJob.description}
          onChange={handleJobChange}
        />
        <Button onClick={handleAddOrUpdateJob} sx={{ ml: 2 }}>
          {editIndex !== null ? "Update Job" : "Add Job"}
        </Button>
      </Paper>

      {/* Job List */}
      <Grid container spacing={2}>
        {jobs.map((job, index) => (
          <Grid item xs={12} md={6} key={index}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="h6">{job.title}</Typography>
              <Typography variant="body1">{job.description}</Typography>
              <Button
                onClick={() => navigate('/candidates')}
                sx={{ mt: 2 }}
              >
                View Candidates
              </Button>
              <Button onClick={() => handleEditJob(index)}>Edit</Button>
              <IconButton onClick={() => deleteJob(index)}>
                <Delete />
              </IconButton>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default Dashboard;
