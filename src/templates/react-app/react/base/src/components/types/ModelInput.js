import { useState, useEffect } from 'react';
import { TextField } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { apiFactory } from '../../api/apiFactory';
import { models } from '../../constants/models';

const handleChange = (field, update) => (event, value) => {
  console.log(value);
  return update(field, value.id);
};

function getOptionById(options, id) {
  return options.find((option) => option.id === id);
}

function getOptions(collection, modelName) {
  const { primaryProperty } = models[modelName];
  return collection.map((model) => ({ label: model[primaryProperty], id: model.id }));
}

export function ModelInput({
  id,
  label,
  value,
  field,
  options: { model: modelName },
  onChange,
  disabled
}) {
  const [loading, isLoading] = useState(true);
  const [options, setOptions] = useState(null);

  async function getAll(modelName) {
    isLoading(true);
    const api = apiFactory(modelName);
    const collection = await api.getCollection(id);
    console.log(collection);
    const options = getOptions(collection, modelName);
    setOptions(options);
    isLoading(false);
  }

  useEffect(() => {
    getAll(modelName);
  }, [modelName]);

  if (loading) {
    return <div>Loading....</div>;
  }

  return (
    <Autocomplete
      id={id}
      label={label}
      fullWidth
      disabled={disabled}
      disablePortal
      options={options}
      value={getOptionById(options, value)}
      onChange={handleChange(field, onChange)}
      getOptionLabel={(option) => option.label}
      sx={{ width: 300 }}
      renderInput={(params) => (
        <TextField {...params} variant="filled" label={label} />
      )}
    />
  );
}
