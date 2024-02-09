import { ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { NavigationTabs } from '../enums/navigationTabs.enum';

const ListItem = (props: {
  tabName: NavigationTabs,
  icon: string,
  callback?: () => void
}) => {
  return (
    <ListItemButton onClick={props.callback}>
      <ListItemIcon>
        {<props.icon/>}
      </ListItemIcon>
      <ListItemText primary={props.tabName}/>
    </ListItemButton>
  )
};

export default ListItem;
