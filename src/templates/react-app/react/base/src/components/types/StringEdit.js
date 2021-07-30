import { TextField } from '@material-ui/core';

const handleChange = (field, update) => (event) => {
  const value = event.target.value;
  return update(field, value);
};

export function StringEdit({ id, label, value, field, onChange, disabled }) {
  return (
    <TextField
      className="TextField"
      id={id}
      label={label}
      value={value}
      onChange={handleChange(field, onChange)}
      variant="filled"
      fullWidth
      disabled={disabled}
    />
  );
}
