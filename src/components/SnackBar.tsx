import Snackbar from '@mui/material/Snackbar';
import { JSX } from 'react';

const SnackBar = ({ isOpen, message }: { isOpen: boolean, message: string }): JSX.Element => (
  <Snackbar
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right',
    }}
    open={isOpen}
    autoHideDuration={4000}
    message={message}
  />
);

export default SnackBar;
