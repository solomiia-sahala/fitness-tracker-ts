import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Button,
  Link,
} from '@mui/material';
import React, { JSX, useState } from 'react';
import { withFirebase } from './hocComponents/withFirebase';
import SnackBar from './SnackBar';

function PasswordReset(props: any) : JSX.Element {
  const [open, setOpen] = useState<boolean>(false);
  const [openAlert, setOpenAlert] = useState<boolean>(false);
  const [state, setState] = useState<{ email: string, error: string | null }>({ email: '', error: null });

  const handleClickOpen = (): void => {
    setOpen(true);
  };

  const handleClose = (): void => {
    setOpen(false);
    setState({ email: '', error: null });
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = event.target;
    setState({ ...state, [name]: value });
  };

  const handleSubmit = (): void => {
    props.firebase.resetPassword(state.email)
      .then(() => {
        setState({ email: '', error: null });
        handleClose();
        setOpenAlert(true);
        setTimeout(() => {
          setOpenAlert(false);
        }, 3000);
      })
      .catch((error: Error) => {
        setState((prev) => ({ ...prev, error: error.message }));
      });
  };

  const isInvalid: boolean = !state.email;

  return (
    <>
      {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
      <Link onClick={handleClickOpen}>
        Forgot password?
      </Link>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Reset my password</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To reset your password, please enter your email address here for the instructions on how to reset.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Email Address"
            type="email"
            name="email"
            value={state.email}
            onChange={handleChange}
            fullWidth
          />
          {state.error && <p style={{ color: 'red' }}>{state.error}</p>}

        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={isInvalid} type="submit" color="primary">
            Reset password
          </Button>
        </DialogActions>
      </Dialog>

      <SnackBar isOpen={openAlert} message="Password reset link successfully sent" />
    </>
  );
}

export default withFirebase(PasswordReset as unknown as typeof React.Component);
