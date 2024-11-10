// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Box, CssBaseline, Container, List, ListItem, ListItemText, ListItemButton, Drawer, Toolbar, Typography } from '@mui/material';
import Dashboard from './pages/Dashboard';
import Candidates from './pages/Candidates';
import Assessment from './pages/Assessment';
import CandidateDetail from './pages/CandidateDetail';
import { JobProvider } from './context/JobContext';

const drawerWidth = 240;

function App() {
  return (
    <JobProvider>
      <Router>
        <CssBaseline />
        <Box sx={{ display: 'flex' }}>
          <Drawer
            variant="permanent"
            sx={{
              width: drawerWidth,
              flexShrink: 0,
              [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
            }}
          >
            <Toolbar>
              <Typography variant="h6">Hiring Platform</Typography>
            </Toolbar>
            <List>
              <ListItem disablePadding>
                <ListItemButton component={Link} to="/">
                  <ListItemText primary="Dashboard" />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton component={Link} to="/assessment">
                  <ListItemText primary="Assessment" />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton component={Link} to="/candidates">
                  <ListItemText primary="Candidates" />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton component={Link} to="/contact">
                  <ListItemText primary="Contact Us" />
                </ListItemButton>
              </ListItem>
            </List>
          </Drawer>

          <Box component="main" sx={{ flexGrow: 1, p: 2 }}>
            <Toolbar />
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/assessment" element={<Assessment />} />
              <Route path="/candidates" element={<Candidates />} />
              <Route path="/candidates/:candidateId" element={<CandidateDetail />} />
              {/* <Route path="/contact" element={<Contact />} /> */}
            </Routes>
          </Box>
        </Box>
      </Router>
    </JobProvider>
  );
}

export default App;
