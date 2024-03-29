import { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { StatusCodes } from "http-status-codes";
import { get{{modelNamePascal}}, update{{modelNamePascal}} } from '../../api/{{modelNameCamel}}';
import { {{modelNamePascal}}Form } from './{{modelNamePascal}}Form';

export function Edit{{modelNamePascal}}() {
  const [{{modelNameCamel}}, set{{modelNamePascal}}] = useState(null);
  const [error, setError] = useState(null);
  const [validationState, setValidationState] = useState({valid:true, properties:{}});
  const [isLoading, setIsLoading] = useState(true);
  const [processing, setProcessing] = useState(false);

  const history = useHistory();
  const { id: stringId } = useParams();
  const id = parseInt(stringId);

  useEffect(() => {
    get(id);
  }, [id]);

  async function get(id) {
    try {
      setIsLoading(true);
      const {{modelNameCamel}} = await get{{modelNamePascal}}(id);
      console.log({ {{modelNameCamel}} });
      set{{modelNamePascal}}({{modelNameCamel}});  
    } catch (error) {
      setError(error);
    }
    
    setIsLoading(false);
  }

  async function save({{modelNameCamel}}) {
    try {
      setProcessing(true);
      await update{{modelNamePascal}}({{modelNameCamel}});
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

  return (
    <{{modelNamePascal}}Form
      ctaLabel="Save"
      cta={save}
      isLoading={isLoading}
      processing={processing}
      {{modelNameCamel}}={{=<% %>=}}{<%modelNameCamel%>}<%={{ }}=%>
      error={error}
      validationState={validationState}
    />
  );
}
