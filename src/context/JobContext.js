// src/context/JobContext.js
import React, { createContext, useState, useEffect } from "react";
import candidatesData from "../data/candidates.json";

const JobContext = createContext();

export const JobProvider = ({ children }) => {
  const [jobs, setJobs] = useState([]);
  const [candidates, setCandidates] = useState([]);

  useEffect(() => {
    const savedJobs = JSON.parse(localStorage.getItem("jobs")) || [];
    const savedCandidates = JSON.parse(localStorage.getItem("candidates")) || candidatesData;

    setJobs(savedJobs);
    setCandidates(savedCandidates);
  }, []);

  const addOrUpdateJob = (job, editIndex = null) => {
    const updatedJobs = editIndex !== null 
      ? jobs.map((j, index) => (index === editIndex ? job : j)) 
      : [...jobs, job];
      
    setJobs(updatedJobs);
    localStorage.setItem("jobs", JSON.stringify(updatedJobs));
  };

  const deleteJob = (index) => {
    const updatedJobs = jobs.filter((_, i) => i !== index);
    setJobs(updatedJobs);
    localStorage.setItem("jobs", JSON.stringify(updatedJobs));
  };

  const updateCandidateStatusAndResume = (candidateId, status, resume) => {
    const updatedCandidates = candidates.map(candidate => 
      candidate.id === parseInt(candidateId) 
        ? { ...candidate, status, resume } 
        : candidate
    );

    setCandidates(updatedCandidates);
    localStorage.setItem("candidates", JSON.stringify(updatedCandidates));
  };

  return (
    <JobContext.Provider
      value={{
        jobs,
        candidates,
        addOrUpdateJob,
        deleteJob,
        updateCandidateStatusAndResume,
      }}
    >
      {children}
    </JobContext.Provider>
  );
};

export default JobContext;
