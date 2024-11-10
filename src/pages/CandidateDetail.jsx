import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box, Typography, Paper, Button, TextField } from "@mui/material";
import candidatesData from "../data/candidates.json";

function CandidateDetail() {
  const { candidateId } = useParams();
  const [candidate, setCandidate] = useState(null);
  const [status, setStatus] = useState("");
  const [resume, setResume] = useState(null);

  useEffect(() => {
    const savedCandidates = JSON.parse(localStorage.getItem("candidates")) || candidatesData;
    const currentCandidate = savedCandidates.find((c) => c.id === parseInt(candidateId));
    setCandidate(currentCandidate);
    setStatus(currentCandidate?.status || "");

    if (currentCandidate?.resume) {
      setResume(currentCandidate.resume);
    }
  }, [candidateId]);

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
  };

  const handleResumeUpload = (e) => {
    const uploadedFile = e.target.files[0];
    if (uploadedFile) {
      const resumeData = {
        name: uploadedFile.name,
        type: uploadedFile.type,
        url: URL.createObjectURL(uploadedFile),
      };
      setResume(resumeData);
    }
  };

  const saveStatusAndResume = () => {
    const updatedCandidates = JSON.parse(localStorage.getItem("candidates")) || candidatesData;
    const candidateIndex = updatedCandidates.findIndex((c) => c.id === parseInt(candidateId));

    if (candidateIndex !== -1) {
      updatedCandidates[candidateIndex].status = status;

      if (resume) {
        updatedCandidates[candidateIndex].resume = resume;
      }

      localStorage.setItem("candidates", JSON.stringify(updatedCandidates));
      setCandidate(updatedCandidates[candidateIndex]);
    }
  };

  const handleResumeDownload = () => {
    if (resume) {
      const link = document.createElement("a");
      link.href = resume.url;
      link.download = resume.name;
      link.click();

      URL.revokeObjectURL(resume.url); 
    }
  };

  return (
    <Box>
      {candidate && (
        <>
          <Typography variant="h4" gutterBottom>
            {candidate.name}'s Profile
          </Typography>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6">Name: {candidate.name}</Typography>
            <Typography variant="body1">Application Date: {candidate.applicationDate}</Typography>
            <Typography variant="body1">Contact: {candidate.email || "contact@example.com"}</Typography>
            <Typography variant="body1">Skills: {candidate.skills || "Skills not provided"}</Typography>
            <Typography variant="body1">Experience: {candidate.experience || "Experience not provided"}</Typography>

            {/* Status Update */}
            <TextField
              label="Status"
              variant="outlined"
              value={status}
              onChange={handleStatusChange}
              sx={{ mt: 2, mb: 2 }}
            />
            <Button variant="contained" color="primary" onClick={saveStatusAndResume}>
              Save Status
            </Button>

            {/* Resume Section */}
            <Box mt={2}>
              <input type="file" onChange={handleResumeUpload} accept=".pdf,.doc,.docx" />
              <Button
                variant="contained"
                sx={{ mt: 2 }}
                onClick={handleResumeDownload}
                disabled={!resume}
              >
                Download Resume
              </Button>
            </Box>
          </Paper>
        </>
      )}
    </Box>
  );
}

export default CandidateDetail;
