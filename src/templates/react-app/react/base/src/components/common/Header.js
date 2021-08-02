import { Link as RouterLink } from "react-router-dom";
import { IconButton } from "@material-ui/core";
import "./Header.scss";

function getIcon(icon) {
  if (!icon) {
    return;
  }
  const { label, Icon, to } = icon;

  return (
    <div className="headerIcon">
      <IconButton aria-label={label} component={RouterLink} to={to}>
        <Icon />
      </IconButton>
    </div>
  );
}

export function Header({ title, icon }) {
  return (
    <div className="Header">
      <h1>{title}</h1>
      {getIcon(icon)}
    </div>
  );
}
