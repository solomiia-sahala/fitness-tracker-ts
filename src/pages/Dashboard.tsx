import {
  Box, Container,
  CssBaseline,
  Divider,
  Grid,
  IconButton,
  List,
  Paper,
  Toolbar,
  Typography
} from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import MenuIcon from '@mui/icons-material/Menu';
import Copyright from '../components/Copyright';
import { useState } from 'react';
import { AppBar } from '../components/AppBar';
import { Drawer } from '../components/Drawer';
import { navigationList } from '../constants/navigationList.const';
import ListItem from '../components/ListItem';
import { Link, NavigateFunction, useNavigate, useResolvedPath } from 'react-router-dom';
import { withAuthentication } from '../components/hocComponents/withAuthentication';
import AuthenticationContext from '../contexts/authContext';
import NotAuthorized from '../components/NotAuthorized';
import CreateActivity from '../components/CreateActivity';
import React from 'react';
import { Activity } from '../interfaces/activity.interface';
import { navigationItem } from '../interfaces/navigationItem.interface';
import { NavigationTabs } from '../enums/navigationTabs.enum';
import Sidebar from '../components/Sidebar';
import SnackBar from '../components/SnackBar';
import ActivityList from '../components/ActivityList';

function Dashboard(props: any) {
  const [open, setOpen] = useState<boolean>(true);
  const url: string = useResolvedPath("").pathname;
  const navigate: NavigateFunction = useNavigate();
  const toggleDrawer = (): void => {
    setOpen(!open);
  };

  const signOut = (): void => {
    props.firebase.signOut()
      .then(() => navigate("/"))
      .catch((error: Error) => {
        console.error(error.message)
      });
  }

  return (
    <AuthenticationContext.Consumer>
      {user => user ? (<Box sx={{ display: 'flex' }}>
        <CssBaseline/>
        {/*// @ts-ignore*/}
        <AppBar position="absolute" open={open}>
          <Toolbar
            sx={{
              pr: '24px', // keep right padding when drawer closed
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
              <MenuIcon/>
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
          <Sidebar toggleDrawer={toggleDrawer} signOut={signOut}/>
        </Drawer>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Toolbar/>
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={4}>
              <Grid item xs={12} md={6} lg={4}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 340,
                    width: '100%'
                  }}
                >
                  {/*<Calendar user={user} firebase={props.firebase}/>*/}
                </Paper>
              </Grid>
              <Grid item xs={12} md={6} lg={8}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 390,
                    width: '100%'
                  }}
                >
                  <CreateActivity userId={user.uid} firebase={props.firebase}/>
                </Paper>
              </Grid>
              <Grid item xs={12}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                  <ActivityList userId={user.uid} firebase={props.firebase}/>
                </Paper>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Box>) : <NotAuthorized/>
      }
    </AuthenticationContext.Consumer>
  );
}

export default withAuthentication(Dashboard as any); //todo set type