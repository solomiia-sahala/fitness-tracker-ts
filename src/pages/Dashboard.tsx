import {
  Box, Container, CssBaseline, Grid, IconButton, Paper, Toolbar, Typography,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import React, { JSX, useState } from 'react';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { AppBar } from '../components/AppBar';
import { Drawer } from '../components/Drawer';
import { withAuthentication } from '../components/hocComponents/withAuthentication';
import AuthenticationContext from '../contexts/authContext';
import NotAuthorized from '../components/NotAuthorized';
import CreateActivity from '../components/CreateActivity';
import Sidebar from '../components/Sidebar';
import ActivityList from '../components/ActivityList';
import Firebase from '../services/firebase.service';
import { Activity } from '../interfaces/activity.interface';
import { ActionTypes } from '../enums/actionTypes.enum';
import SnackBar from '../components/SnackBar';
import { SnackBarMessages } from '../constants/snackBarMessages.const';

function Dashboard({ firebase }: { firebase: Firebase }): JSX.Element {
  const [open, setOpen] = useState<boolean>(true);
  const [selectedActivity, setSelectedActivity] = useState<{activity: Activity, key: string} | null>(null);
  const [snackbarConfig, setSnackbarConfig] = useState<{ isOpen: boolean, message: string }>({ isOpen: false, message: '' });
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

  const handleAction = (actionType: ActionTypes, activity: Activity | null, userId: string, key?: string): void => {
    let request: Promise<any>;

    switch (actionType) {
      case ActionTypes.Create:
        request = firebase.addActivity(userId, activity!);
        break;
      case ActionTypes.Update:
        request = firebase.updateActivity(userId, activity, key!).then(() => {
          setSelectedActivity(null);
        });
        break;
      case ActionTypes.Delete:
        request = firebase.updateActivity(userId, null, key!);
        break;
      default:
    }

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    request.then(() => {
      setSnackbarConfig({ isOpen: true, message: SnackBarMessages[actionType] });
      setTimeout(() => setSnackbarConfig((prev) => ({ ...prev, isOpen: false })), 3000);
    });
  };

  const onEditActivity = (activity: Activity, key: string): void => {
    setSelectedActivity({ activity, key });
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
              <Grid container spacing={4}>
                {/* <Grid item xs={12} md={6} lg={4}> */}
                {/*  <Paper */}
                {/*    sx={{ */}
                {/*      p: 2, */}
                {/*      display: 'flex', */}
                {/*      flexDirection: 'column', */}
                {/*      height: 340, */}
                {/*      width: '100%', */}
                {/*    }} */}
                {/*  > */}
                {/*     <Calendar user={user} firebase={props.firebase}/> */}
                {/*  </Paper> */}
                {/* </Grid> */}
                <Grid item xs={12} md={6} lg={12}>
                  <Paper
                    sx={{
                      p: 2,
                      display: 'flex',
                      flexDirection: 'column',
                      height: 390,
                      width: '100%',
                    }}
                  >
                    <CreateActivity
                      userId={user.uid}
                      selectedActivity={selectedActivity}
                      handleAction={handleAction}
                      onCancel={() => setSelectedActivity(null)}
                    />
                  </Paper>
                </Grid>
                <Grid item xs={12}>
                  <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                    <ActivityList
                      userId={user.uid}
                      firebase={firebase}
                      handleAction={handleAction}
                      onEdit={onEditActivity}
                    />
                  </Paper>
                </Grid>
              </Grid>
              <SnackBar isOpen={snackbarConfig.isOpen} message={snackbarConfig.message} />
            </Container>
          </Box>
        </Box>
      ) : <NotAuthorized />)}
    </AuthenticationContext.Consumer>
  );
}

export default withAuthentication(Dashboard as any);
