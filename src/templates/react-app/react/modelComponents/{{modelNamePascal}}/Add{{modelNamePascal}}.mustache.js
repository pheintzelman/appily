import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { add{{modelNamePascal}} } from '../../api/{{modelNameCamel}}';
import { {{modelNamePascal}}Form } from './{{modelNamePascal}}Form';

export function Add{{modelNamePascal}}() {
  const [processing, setProcessing] = useState(false);
  const history = useHistory();

  async function add({{modelNameCamel}}) {
    setProcessing(true);
    const id = await add{{modelNamePascal}}({{modelNameCamel}});
    setProcessing(false);
    history.push(`/{{modelNameCamel}}/${id}`);
  }

  return <{{modelNamePascal}}Form ctaLabel="Add" cta={add} processing={processing} />;
}
