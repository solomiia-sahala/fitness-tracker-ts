import { Link, useResolvedPath } from 'react-router-dom';
import {
  Divider, IconButton, List, Toolbar,
} from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { JSX } from 'react';
import { navigationList } from '../constants/navigationList.const';
import ListItem from './ListItem';
import { navigationItem } from '../interfaces/navigationItem.interface';
import { NavigationTabs } from '../enums/navigationTabs.enum';

const Sidebar = ({ toggleDrawer, signOut }: {
    toggleDrawer: () => void,
    signOut: () => void,
}): JSX.Element => {
  const url = useResolvedPath('').pathname;
  return (
    <>
      <Toolbar
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
          px: [1],
        }}
      >
        <IconButton onClick={toggleDrawer}>
          <ChevronLeftIcon />
        </IconButton>
      </Toolbar>
      <Divider />
      <List component="nav">
        {navigationList.map((item: navigationItem, i: number) => {
          if (item.tabName === NavigationTabs.Logout) {
            return <ListItem key={i} {...item} callback={signOut} />;
          }
          return (
            <Link
              to={`${url}${item.path}`}
              key={i}
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              <ListItem {...item} />
            </Link>
          );
        })}
      </List>
    </>
  );
};

export default Sidebar;
