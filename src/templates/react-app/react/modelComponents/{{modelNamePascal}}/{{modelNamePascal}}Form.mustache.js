import { useState, useEffect } from 'react';
import {
  Button
} from '@material-ui/core';
{{#componentImports}}
import { {{component.edit}} } from '../types/{{component.edit}}';
{{/componentImports}}
import { ContentContainer } from "../common/containers/ContentContainer";

export function {{modelNamePascal}}Form({
  {{modelNameCamel}}: initialState,
  ctaLabel,
  cta,
  isLoading,
  processing,
  error
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

  return (
    <ContentContainer 
      title="{{modelName}}"
      error={error}
      loading={isLoading}
      className="{{modelNamePascal}}Form"
    >
      <div className="content">
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
    </ContentContainer>
  );
}
