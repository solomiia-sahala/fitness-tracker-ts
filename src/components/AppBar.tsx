import {styled} from '@mui/material/styles';
import MuiAppBar from '@mui/material/AppBar';
import { drawerWidth } from '../constants/drawerWidth';

export const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop: any) => prop !== 'open',
})(({ theme, open } : any) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));
