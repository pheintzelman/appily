import { useState } from 'react';
import { Button, Container, TextField } from '@material-ui/core';
import { add{{modelNamePascal}} } from '../api/{{modelNameCamel}}';

export function {{modelNamePascal}}Form() {
  const cta = 'Add';
  const [{{modelNameCamel}}, set{{modelNamePascal}}] = useState({{{defaultState}}});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (field) => (event) => {
    const updated{{modelNamePascal}} = { ...{{modelNameCamel}}, [field]: event.target.value };
    set{{modelNamePascal}}(updated{{modelNamePascal}});
    console.log(updated{{modelNamePascal}});
  };

  function add({{modelNameCamel}}) {
    return async (event) => {
      setIsLoading(true);
      await add{{modelNamePascal}}({{modelNameCamel}});
      setIsLoading(false);
    };
  }

  return (
    <Container maxWidth="sm" className="{{modelNamePascal}}Form">
      <h1>{{ modelName }}</h1>
      <form noValidate autoComplete="off">
        {{#properties}}
          {{#isString}}
          <TextField
            className="TextField"
            id="{{modelNameCamel}}Form{{propertyNamePascal}}"
            label="{{propertyName}}"
            value={{=<% %>=}}{<%modelNameCamel%>.<%propertyNameCamel%>}<%={{ }}=%>
            onChange={handleChange('{{propertyNameCamel}}')}
            variant="filled"
            fullWidth
            disabled={isLoading}
          />
          {{/isString}}
        {{/properties}}

        <Button
          className="cta"
          id="{{modelNameCamel}}FormCta"
          color="primary"
          onClick={add({{modelNameCamel}})}
          disabled={isLoading}
        >
          {cta}
        </Button>
      </form>
    </Container>
  );
}
