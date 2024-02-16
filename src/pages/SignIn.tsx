import React, { JSX, useState } from 'react';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { CssBaseline, TextField } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import { Link, useNavigate } from 'react-router-dom';
import Copyright from '../components/Copyright';
import { withFirebase } from '../components/hocComponents/withFirebase';
import PasswordReset from '../components/PasswordReset';

interface UserSignIn {
  id: string | null,
  email: string,
  password: string,
  error: null | string,
  auth: any
}

const userInitialData: UserSignIn = {
  id: null, email: '', password: '', error: null, auth: null,
};

const SignIn = (props: any): JSX.Element => {
  const [user, setUser] = useState<UserSignIn>(userInitialData);
  const navigate = useNavigate();

  const isValid = (): boolean => !!user.email && !!user.password;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = event.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (): void => {
    props.firebase.signInWithEmailAndPassword(user.email, user.password)
      .then(() => {
        setUser(userInitialData);
        navigate('/dashboard');
      })
      .catch((error: Error) => {
        setUser({ ...user, error: error.message });
        console.error(error.message);
      });
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box component="form" onSubmit={(e: React.SyntheticEvent) => e.preventDefault()} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={handleChange}
          />
          <Typography>
            {user.error && user.error}
          </Typography>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={!isValid()}
            onClick={handleSubmit}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <PasswordReset />
            </Grid>
            <Grid item>
              <Link to="/sign-up">
                Don`t have an account? Sign Up
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Copyright sx={{ mt: 8, mb: 4 }} />
    </Container>
  );
};
export default withFirebase(SignIn as unknown as typeof React.Component);
