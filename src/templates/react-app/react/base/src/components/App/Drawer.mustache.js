import { Link } from 'react-router-dom';
import {
  Drawer as MaterialDrawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  IconButton,
  Divider
} from '@material-ui/core';
import { ChevronLeft as ChevronLeftIcon, Home as HomeIcon } from '@material-ui/icons';
import './Drawer.scss';

export function Drawer(props) {
  const { open, handleClose } = props;

  return (
    <div className="Drawer">
      <MaterialDrawer
        className="drawer"
        variant="persistent"
        anchor="left"
        open={open}
        classes={{=<% %>=}}{{
          paper: 'drawerPaper'
        }}<%={{ }}=%>
      >
        <div className="drawerHeader">
          <IconButton onClick={handleClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <List>
          <ListItem button key={'Home'} component={Link} to="/">
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary={'Home'} />
          </ListItem>
        </List>
        <Divider />
        <List>
          {{#models}}
          <ListItem button component={Link} to="/{{pluralModelNamePascal}}">
            <ListItemText primary="{{pluralModelName}}" />
          </ListItem>
          {{/models}}
        </List>
      </MaterialDrawer>
    </div>
  );
}
