import { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { get{{modelNamePascal}}, remove{{modelNamePascal}} } from '../../api/{{modelNameCamel}}';
{{#componentImports}}
import { {{component.view}} } from '../types/{{component.view}}';
{{/componentImports}}
import { ConfirmDialog } from '../common/ConfirmDialog';
import { ContentContainer } from "../common/containers/ContentContainer";

function handleRemove{{modelNamePascal}}({ id, setIsLoading, setError, history }) {
  return async () => {
    try {
      setIsLoading(true);
      await remove{{modelNamePascal}}(id);
      history.push(`/{{pluralModelNameCamel}}`); 
    } catch (error) {
      setError(error);
      setIsLoading(false);
    }
  };
}

function getDialogText({{modelNameCamel}}) {
  const title = {{modelNameCamel}}.{{primaryPropertyCamel}};

  if (title === '') {
    return `Do you want to delete this {{modelNameSentenceCase}}?`;
  }

  return `Do you want to delete the {{modelNameSentenceCase}}, ${title}?`;
}

export function {{modelNamePascal}}() {
  const [{{modelNameCamel}}, set{{modelNamePascal}}] = useState({{{defaultState}}});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
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
    } catch (error){
      setError(error);
    }

    setIsLoading(false);
  }

  const actions = [
    { Icon: EditIcon, to: `edit/${id}`, label: 'Edit' },
    {
      Icon: DeleteIcon,
      onClick: () => setDialogOpen(true),
      label: 'Delete'
    }
  ];

  return (
    <ContentContainer
      title="{{modelName}}"
      error={error}
      loading={isLoading}
      actions={actions}
      className="{{modelNamePascal}}"
    >
      <div className="content">
        {{#properties}}
        <{{component.view}} label="{{propertyName}}" value={{=<% %>=}}{<%modelNameCamel%>.<%propertyNameCamel%>}<%={{ }}=%> />
        {{/properties}}
      </div>
      <ConfirmDialog
        text={getDialogText({{modelNameCamel}})}
        title="Confirm Delete"
        open={dialogOpen}
        setOpen={setDialogOpen}
        onConfirm={handleRemove{{modelNamePascal}}({ 
          id, 
          setIsLoading, 
          history, 
          setError 
        })}
      />
    </ContentContainer>
  );
}
