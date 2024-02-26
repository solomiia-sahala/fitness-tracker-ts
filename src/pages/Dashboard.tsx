import {
  Box, Container, CssBaseline, IconButton, Toolbar, Typography,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import React, { JSX, useState } from 'react';
import {
  NavigateFunction, useNavigate, Outlet, useOutletContext,
} from 'react-router-dom';
import { AppBar } from '../components/AppBar';
import { Drawer } from '../components/Drawer';
import { withAuthentication } from '../components/hocComponents/withAuthentication';
import AuthenticationContext from '../contexts/authContext';
import NotAuthorized from '../components/NotAuthorized';
import Sidebar from '../components/Sidebar';
import Firebase from '../services/firebase.service';

type ContextType = { userId: string, firebase: Firebase };

export function useUserContext(): ContextType {
  return useOutletContext<ContextType>();
}

function Dashboard({ firebase }: { firebase: Firebase }): JSX.Element {
  const [open, setOpen] = useState<boolean>(true);
  const navigate: NavigateFunction = useNavigate();
  const toggleDrawer = (): void => {
    setOpen(!open);
  };

  const signOut = (): void => {
    firebase.signOut()
      .then(() => navigate('/'))
      .catch((error: Error) => {
        console.error(error.message);
      });
  };

  return (
    <AuthenticationContext.Consumer>
      {(user) => (user ? (
        <Box sx={{ display: 'flex' }}>
          <CssBaseline />
          {/*
          eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
          {/*
@ts-ignore */}
          <AppBar position="absolute" open={open}>
            <Toolbar
              sx={{
                pr: '24px',
              }}
            >
              <IconButton
                edge="start"
                color="inherit"
                aria-label="open drawer"
                onClick={toggleDrawer}
                sx={{
                  marginRight: '36px',
                  ...(open && { display: 'none' }),
                }}
              >
                <MenuIcon />
              </IconButton>
              <Typography
                component="h1"
                variant="h6"
                color="inherit"
                noWrap
                sx={{ flexGrow: 1 }}
              >
                Dashboard
              </Typography>
            </Toolbar>
          </AppBar>
          <Drawer variant="permanent" open={open}>
            <Sidebar toggleDrawer={toggleDrawer} signOut={signOut} />
          </Drawer>
          <Box
            component="main"
            sx={{
              backgroundColor: (theme) => (theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900]),
              flexGrow: 1,
              height: '100vh',
              overflow: 'auto',
            }}
          >
            <Toolbar />
            <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
              <Outlet context={{ userId: user.uid, firebase }} />
            </Container>
          </Box>
        </Box>
      ) : <NotAuthorized />)}
    </AuthenticationContext.Consumer>
  );
}

export default withAuthentication(Dashboard as any);
