import { useState, useEffect } from 'react';
import {
  Button,
  Container,
  CircularProgress
} from '@material-ui/core';
import { Center } from '../common/Center';
import { StringEdit } from '../types/StringEdit';
import { BooleanEdit } from '../types/BooleanEdit';

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

  const handleChange = (field, value) => {
    const updated{{modelNamePascal}} = { ...{{modelNameCamel}}, [field]: value };
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
        <StringEdit
          id="{{modelNameCamel}}Form{{propertyNamePascal}}"
          label="{{propertyName}}"
          value={{=<% %>=}}{<%modelNameCamel%>.<%propertyNameCamel%>}<%={{ }}=%>
          field="{{propertyNameCamel}}"
          onChange={handleChange}
          disabled={processing}
        />
        {{/isString}}

        {{#isBoolean}}     
        <BooleanEdit 
          id="{{modelNameCamel}}Form{{propertyNamePascal}}"
          value={{=<% %>=}}{<%modelNameCamel%>.<%propertyNameCamel%>}<%={{ }}=%>
          label="{{propertyName}}"
          field="{{propertyNameCamel}}"
          onChange={handleChange}
          disabled={processing}
        />
        {{/isBoolean}}
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
