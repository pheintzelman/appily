import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Menu,
  MenuItem,
  IconButton,
  ListItemIcon,
  ListItemText
} from '@material-ui/core';
import { MoreVert as MoreVertIcon } from '@material-ui/icons';

function getAction({ to, onClick, handleClose }) {
  if (to) {
    return { component: RouterLink, to };
  }

  if (onClick) {
    return {
      onClick: () => {
        handleClose();
        onClick();
      }
    };
  }

  return {};
}

function renderActions(actions, handleClose) {
  return actions.map(({ Icon, label, to, onClick }) => (
    <MenuItem {...getAction({ to, onClick, handleClose })} key={label}>
      <ListItemIcon>
        <Icon fontSize="small" />
      </ListItemIcon>
      <ListItemText primary={label} />
    </MenuItem>
  ));
}

export default function HeaderMenu({ actions }) {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton
        aria-label="menu"
        aria-controls="menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="customized-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {renderActions(actions, handleClose)}
      </Menu>
    </div>
  );
}
