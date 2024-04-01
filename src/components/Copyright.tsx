import Typography from '@mui/material/Typography/Typography';
import { JSX, memo } from 'react';

const Copyright = (): JSX.Element => (
  <Typography variant="body2" color="tabName.secondary" align="center" sx={{ mt: 8, mb: 4 }}>
    {'Copyright © '}
    {new Date().getFullYear()}
    .
  </Typography>
        );

export default memo(Copyright);
