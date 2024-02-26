import './App.css';
import React from 'react';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import Error from './components/Error';
import SignIn from './pages/SignIn';
import theme from './config/theme.config';
import Dashboard from './pages/Dashboard';
import SignUp from './pages/SignUp';
import ProgressChart from './components/ProgressChart';
import ManageActivity from './components/ManageActivity';
import FitnessJournal from './components/FitnessJournal';

function App(): any {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/dashboard" element={<Dashboard />}>
            <Route index element={<ManageActivity />} />
            <Route path="progressChart" element={<ProgressChart />} />
            <Route path="fitnessJournal" element={<FitnessJournal />} />
          </Route>
          <Route path="*" element={<Error />} />
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
