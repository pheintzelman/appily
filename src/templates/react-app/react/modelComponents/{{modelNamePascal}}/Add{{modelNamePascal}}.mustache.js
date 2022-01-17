import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { add{{modelNamePascal}} } from '../../api/{{modelNameCamel}}';
import { {{modelNamePascal}}Form } from './{{modelNamePascal}}Form';

export function Add{{modelNamePascal}}() {
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState(false);
  const history = useHistory();

  async function add({{modelNameCamel}}) {
    try {
      setProcessing(true);
      const { id } = await add{{modelNamePascal}}({{modelNameCamel}});
      setProcessing(false);
      history.push(`/{{modelNameCamel}}/${id}`);
    } catch (error) {
      setError(error);
      setProcessing(false);
    }
  }

  return <{{modelNamePascal}}Form
      ctaLabel="Add"
      cta={add}
      processing={processing}
      error={error}
    />
}
