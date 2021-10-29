import { TextField } from '@material-ui/core';

const handleChange = (field, update) => (event) => {
  const value = event.target.value;
  return update(field, value);
};

export function StringInput({
  id,
  label,
  value,
  field,
  onChange,
  disabled,
  validationState,
  required
}) {
  const error = validationState && !validationState.valid;
  const helperText =
    validationState &&
    validationState.messages &&
    validationState.messages.length > 0
      ? validationState.messages[0]
      : null;

  return (
    <TextField
      error={error}
      className="TextField"
      id={id}
      label={label}
      value={value}
      onChange={handleChange(field, onChange)}
      variant="filled"
      fullWidth
      disabled={disabled}
      helperText={helperText}
      required={required}
    />
  );
}
