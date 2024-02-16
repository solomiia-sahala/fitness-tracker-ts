import Typography from '@mui/material/Typography/Typography';
import { JSX } from 'react';

const Copyright = (props: any): JSX.Element => (
  <Typography variant="body2" color="tabName.secondary" align="center" {...props}>
    {'Copyright © '}
    {new Date().getFullYear()}
    .
  </Typography>
);

export default Copyright;
