import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { StatusCodes } from "http-status-codes";
import { add{{modelNamePascal}} } from '../../api/{{modelNameCamel}}';
import { {{modelNamePascal}}Form } from './{{modelNamePascal}}Form';

export function Add{{modelNamePascal}}() {
  const [error, setError] = useState(null);
  const [validationState, setValidationState] = useState({valid:true, properties:{}});
  const [processing, setProcessing] = useState(false);
  const history = useHistory();

  async function add({{modelNameCamel}}) {
    try {
      setProcessing(true);
      const { id } = await add{{modelNamePascal}}({{modelNameCamel}});
      setProcessing(false);
      history.push(`/{{modelNameCamel}}/${id}`);
    } catch (error) {
      if(error.status === StatusCodes.BAD_REQUEST)
      {
        console.log({validationState: error.body});
        setValidationState(error.body);
        setProcessing(false);
        return;
      }

      setError(error);
      setProcessing(false);
    }
  }

  return <{{modelNamePascal}}Form
      ctaLabel="Add"
      cta={add}
      processing={processing}
      error={error}
      validationState={validationState}
    />
}
