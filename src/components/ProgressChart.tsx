import React, { JSX } from 'react';
import { CssBaseline } from '@mui/material';
import Container from '@mui/material/Container';
import Copyright from './Copyright';

const ProgressChart = (): JSX.Element => (
  <Container component="main" maxWidth="xs">
    <CssBaseline />
    Progress chart should go here
    <Copyright sx={{ mt: 8, mb: 4 }} />
  </Container>
);
export default ProgressChart;
