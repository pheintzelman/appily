import CheckIcon from "@material-ui/icons/Check";

function getIcon(value) {
  if (value) {
    return <CheckIcon color="primary" style={{ fontSize: 12 }} />;
  }

  return "-";
}

export function BooleanView({ label, value }) {
  return (
    <div>
      {label}: {getIcon(value)}
    </div>
  );
}
