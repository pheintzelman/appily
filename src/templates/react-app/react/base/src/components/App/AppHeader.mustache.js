import React from 'react';
import clsx from 'clsx';
import {
  CssBaseline,
  AppBar,
  Toolbar,
  Typography,
  IconButton
} from '@material-ui/core';
import { Menu as MenuIcon } from '@material-ui/icons';
import { Drawer } from './Drawer';
import './AppHeader.scss';

export function AppHeader() {
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div className="AppHeader">
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx('appBar', {
          appBarShift: open
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx('menuButton', open && 'hide')}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            {{ appName }}
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer open={open} handleClose={handleDrawerClose} />
    </div>
  );
}
