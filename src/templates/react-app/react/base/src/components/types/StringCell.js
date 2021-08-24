function renderValue(value) {
  return !value || value === '' ? '--' : value;
}

export function StringCell({ value }) {
  return <div> {renderValue(value)} </div>;
}
