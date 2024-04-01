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
import red from '@mui/material/colors/red';
import { UserCredential } from 'firebase/auth';
import Copyright from '../components/Copyright';
import { withFirebase } from '../components/hocComponents/withFirebase';

interface UserSignUp {
  id: null | number;
  email: string;
  password: string,
  firstName: string,
  lastName: string,
  error: null | string,
  auth: any
}

const userInitialData: UserSignUp = {
  id: null,
  email: '',
  password: '',
  firstName: '',
  lastName: '',
  error: null,
  auth: null,
};

const SignUp = (props: any): JSX.Element => {
  const [user, setUser] = useState<UserSignUp>(userInitialData);
  const navigate = useNavigate();
  const isValid = (): boolean => !!user.email && !!user.password && !!user.firstName && !!user.lastName;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = event.target;
    setUser((prev: UserSignUp) => ({ ...prev, [name]: value }));
  };
  const handleSubmit = (): void => {
    props.firebase.createUserWithEmailAndPassword(user.email, user.password)
      .then((authUser: UserCredential) => props.firebase
        .saveUserData(authUser.user.uid, {
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
        }))
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
          Sign up
        </Typography>
        <Box component="form" onSubmit={(e: React.SyntheticEvent) => e.preventDefault()} noValidate sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="given-name"
                name="firstName"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="family-name"
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
                onChange={handleChange}
              />
            </Grid>
          </Grid>
          <Typography
            sx={{
              color: red,
            }}
          >
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
            Sign Up
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link to="/">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Copyright />
    </Container>
  );
};
export default withFirebase(SignUp as unknown as typeof React.Component);
