import { FormControlLabel, Checkbox } from '@material-ui/core';

const handleChange = (field, update) => (event) => {
  const value = event.target.checked;
  return update(field, value);
};

export function BooleanEdit({ id, label, value, field, onChange, disabled }) {
  return (
    <FormControlLabel
      control={<Checkbox checked={value} color="primary" />}
      id={id}
      label={label}
      disabled={disabled}
      onChange={handleChange(field, onChange)}
    />
  );
}
