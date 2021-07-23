import { FormControlLabel, Switch } from '@material-ui/core';

const handleChange = (field, update) => (event) => {
  const value = event.target.checked;
  return update(field, value);
};

export function BooleanEdit({ id, label, value, field, onChange, disabled }) {
  return (
    <FormControlLabel
      id={id}
      checked={value}
      control={<Switch color="primary" />}
      label={label}
      labelPlacement="start"
      onChange={handleChange(field, onChange)}
      disabled={disabled}
    />
  );
}
