import CheckIcon from '@material-ui/icons/Check';
import './BooleanCell.scss';

function getIcon(value) {
  if (value) {
    return <CheckIcon color="primary" style={{ fontSize: 12 }} />;
  }

  return '-';
}

export function BooleanCell({ value }) {
  return <div className="BooleanCell">{getIcon(value)}</div>;
}
