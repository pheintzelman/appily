import { Link as RouterLink } from 'react-router-dom';
import { IconButton } from '@material-ui/core';
import HeaderMenu from './HeaderMenu';
import './Header.scss';

function getAction({ to, onClick }) {
  if (to) {
    return { component: RouterLink, to };
  }

  if (onClick) {
    return { onClick };
  }

  return {};
}

function getIcon(icon) {
  if (!icon) {
    return;
  }
  const { label, Icon, to, onClick } = icon;

  return (
    <div className="headerIcon">
      <IconButton aria-label={label} {...getAction({ to, onClick })}>
        <Icon />
      </IconButton>
    </div>
  );
}

function renderActions(actions) {
  if (!actions || actions.length <= 0) {
    return;
  }

  if (actions.length === 1) {
    return getIcon(actions[0]);
  }

  return HeaderMenu({ actions });
}

export function Header({ title, actions }) {
  return (
    <div className="Header">
      <h1>{title}</h1>
      {renderActions(actions)}
    </div>
  );
}
