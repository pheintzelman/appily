import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Link as RouterLink } from 'react-router-dom';
import { Container, CircularProgress, IconButton } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import { Center } from '../common/Center';
import { get{{modelNamePascal}} } from '../../api/{{modelNameCamel}}';
{{#componentImports}}
import { {{component.view}} } from '../types/{{component.view}}';
{{/componentImports}}

function loading() {
  return (
    <Container maxWidth="sm" className="Container {{modelNamePascal}}">
      <h1>{{modelName}}</h1>
      <Center className="loading">
        <CircularProgress />
      </Center>
    </Container>
  );
}

function {{modelNameCamel}}NotFound() {
  return (
    <Container maxWidth="sm" className="Container {{modelNamePascal}}">
      <h1>{{modelName}}</h1>
      <h2>Not found</h2>
    </Container>
  );
}

export function {{modelNamePascal}}() {
  const [{{modelNameCamel}}, set{{modelNamePascal}}] = useState({{{defaultState}}});
  const [isLoading, setIsLoading] = useState(true);
  const { id: stringId } = useParams();
  const id = parseInt(stringId);

  useEffect(() => {
    get(id);
  }, [id]);

  async function get(id) {
    setIsLoading(true);
    const {{modelNameCamel}} = await get{{modelNamePascal}}(id);
    console.log({ {{modelNameCamel}} });
    set{{modelNamePascal}}({{modelNameCamel}});
    setIsLoading(false);
  }

  if (isLoading) {
    return loading();
  }

  if (!{{modelNameCamel}}) {
    return {{modelNameCamel}}NotFound();
  }

  return (
    <Container maxWidth="sm" className="Container {{modelNamePascal}}">
      <div className="header">
        <h1>{{modelName}}</h1>
        <div className="headerIcon">
          <IconButton
            aria-label="edit"
            component={RouterLink}
            to={`edit/${id}`}
          >
            <EditIcon />
          </IconButton>
        </div>
      </div>

      {{#properties}}
      <{{component.view}} label="{{propertyName}}" value={{=<% %>=}}{<%modelNameCamel%>.<%propertyNameCamel%>}<%={{ }}=%> />
      {{/properties}}
    </Container>
  );
}