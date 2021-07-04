import { useState, useEffect } from 'react';
import {
  Button,
  Container,
  TextField,
  CircularProgress
} from '@material-ui/core';
import { Center } from '../common/Center';

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

export function {{modelNamePascal}}Form({
  {{modelNameCamel}}: initialState,
  ctaLabel,
  cta,
  isLoading,
  processing
}) {
  const [{{modelNameCamel}}, set{{modelNamePascal}}] = useState(
    initialState ?? {{{defaultState}}}
  );

  useEffect(() => {
    if (initialState) {
      set{{modelNamePascal}}(initialState);
    }
  }, [initialState]);

  const handleChange = (field) => (event) => {
    const updated{{modelNamePascal}} = { ...{{modelNameCamel}}, [field]: event.target.value };
    set{{modelNamePascal}}(updated{{modelNamePascal}});
    console.log(updated{{modelNamePascal}});
  };

  function handleCta(cta, {{modelNameCamel}}) {
    return async (event) => {
      await cta({{modelNameCamel}});
    };
  }

  if (isLoading) {
    return loading();
  }

  return (
    <Container maxWidth="sm" className="Container {{modelNamePascal}}Form">
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
          disabled={processing}
        />
        {{/isString}}
        {{/properties}}

        <Button
          className="cta"
          id="{{modelNameCamel}}FormCta"
          color="primary"
          onClick={handleCta(cta, {{modelNameCamel}})}
          disabled={processing}
        >
          {ctaLabel}
        </Button>
      </form>
    </Container>
  );
}
