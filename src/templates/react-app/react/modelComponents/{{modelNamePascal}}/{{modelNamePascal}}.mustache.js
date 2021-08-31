import { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { Container, CircularProgress } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { Center } from '../common/Center';
import { get{{modelNamePascal}}, remove{{modelNamePascal}} } from '../../api/{{modelNameCamel}}';
{{#componentImports}}
import { {{component.view}} } from '../types/{{component.view}}';
{{/componentImports}}
import { Header } from '../common/Header';
import { ConfirmDialog } from '../common/ConfirmDialog';
import { MessageContainer } from "../common/MessageContainer";

function loading() {
  return (
    <Container maxWidth="sm" className="Container {{modelNamePascal}}">
      <Header title="{{modelName}}"/>
      <Center className="loading">
        <CircularProgress />
      </Center>
    </Container>
  );
}

function renderError() {
  return (
    <MessageContainer title="{{modelName}}" message="Something went wrong." />
  );
}

function {{modelNameCamel}}NotFound() {
  return (
    <MessageContainer title="{{modelName}}" message="Not found" />
  );
}

function handleRemove{{modelNamePascal}}({ id, setIsLoading, history }) {
  return async () => {
    setIsLoading(true);
    await remove{{modelNamePascal}}(id);
    history.push(`/{{pluralModelNameCamel}}`);
  };
}

function handleConfirmDialogConfrim(setConfirmDialogOpen, onConfirm) {
  return () => {
    if (onConfirm) {
      onConfirm();
    }

    setConfirmDialogOpen(false);
  };
}

function handleConfirmDialogCancel(setConfirmDialogOpen) {
  return () => {
    setConfirmDialogOpen(false);
  };
}

function openConfirmDialog(setConfirmDialogOpen) {
  return () => {
    setConfirmDialogOpen(true);
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
  const [error, hasError] = useState(false);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
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
      hasError(true);
    }

    setIsLoading(false);
  }

  if (error) {
    return renderError();
  }

  if (isLoading) {
    return loading();
  }

  if (!{{modelNameCamel}}) {
    return {{modelNameCamel}}NotFound();
  }

  const headerActions = [
    { Icon: EditIcon, to: `edit/${id}`, label: 'Edit' },
    {
      Icon: DeleteIcon,
      onClick: openConfirmDialog(setConfirmDialogOpen),
      label: 'Delete'
    }
  ];

  return (
    <Container maxWidth="sm" className="Container {{modelNamePascal}}">
      <Header title="{{modelName}}" actions={headerActions}/>
      <div className="containerContent">
        {{#properties}}
        <{{component.view}} label="{{propertyName}}" value={{=<% %>=}}{<%modelNameCamel%>.<%propertyNameCamel%>}<%={{ }}=%> />
        {{/properties}}
      </div>
      <ConfirmDialog
        text={getDialogText({{modelNameCamel}})}
        title="Confirm Delete"
        open={confirmDialogOpen}
        onCancel={handleConfirmDialogCancel(setConfirmDialogOpen)}
        onConfirm={handleConfirmDialogConfrim(
          setConfirmDialogOpen,
          handleRemove{{modelNamePascal}}({ id, setIsLoading, history })
        )}
      />
    </Container>
  );
}
