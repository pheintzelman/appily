import "./Center.scss";

export function Center(props) {
  const classes = [props.className, "Center"].join(" ");

  return <div className={classes}>{props.children}</div>;
}
