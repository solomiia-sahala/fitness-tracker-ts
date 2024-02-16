import { ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { JSX } from 'react';
import { NavigationTabs } from '../enums/navigationTabs.enum';

interface listItemProps {
    tabName: NavigationTabs,
    // eslint-disable-next-line react/no-unused-prop-types
    icon: string,
    // eslint-disable-next-line react/require-default-props
    callback?: () => void
}

const ListItem = (props: listItemProps): JSX.Element => (
  <ListItemButton onClick={props.callback}>
    <ListItemIcon>
      <props.icon />
    </ListItemIcon>
    <ListItemText primary={props.tabName} />
  </ListItemButton>
);

export default ListItem;
