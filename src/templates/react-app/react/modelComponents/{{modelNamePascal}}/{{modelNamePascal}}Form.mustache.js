import { useState, useEffect } from 'react';
import {
  Button,
  Container,
  CircularProgress
} from '@material-ui/core';
import { Center } from '../common/Center';
{{#componentImports}}
import { {{component.edit}} } from '../types/{{component.edit}}';
{{/componentImports}}
import { Header } from "../../components/common/Header";

function loading() {
  return (
    <Container maxWidth="sm" className="Container {{modelNamePascal}}">
      <Header title="{{ modelName }}" />
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
      <Header title="{{ modelName }}" />
      <div className="containerContent">
        <form noValidate autoComplete="off">
          {{#properties}}
          <{{component.edit}}
            id="{{modelNameCamel}}Form{{propertyNamePascal}}"
            label="{{propertyName}}"
            value={{=<% %>=}}{<%modelNameCamel%>.<%propertyNameCamel%>}<%={{ }}=%>
            field="{{propertyNameCamel}}"
            onChange={handleChange}
            disabled={processing}
          />

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
      </div>
    </Container>
  );
}
