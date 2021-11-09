import { useState, useEffect } from 'react';
import {
  Button
} from '@material-ui/core';
import { validate, Validator } from 'appily-validate';
{{#componentImports}}
import { {{component.edit}} } from '../types/{{component.edit}}';
{{/componentImports}}
import { ContentContainer } from '../common/containers/ContentContainer';

function validate{{modelNamePascal}}({{modelNameCamel}}) {
  const rules = [
    {{#properties}}
    {{#required}}
    { type: Validator.NotEmpty, property: '{{propertyNameCamel}}', message: 'required' }{{#last}},{{/last}}
    {{/required}}
    {{/properties}}
  ];

  const state = validate(rules, {{modelNameCamel}});
  console.log(state);
  return state;
}

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

  const [validationState, setValidationState] = useState({valid:true, properties:{}});

  useEffect(() => {
    if (initialState) {
      set{{modelNamePascal}}(initialState);
    }
  }, [initialState]);

  useEffect(() => {
    console.log({validationState});
  }, [validationState]);

  const handleChange = (field, value) => {
    const updated{{modelNamePascal}} = { ...{{modelNameCamel}}, [field]: value };
    set{{modelNamePascal}}(updated{{modelNamePascal}});
    console.log(updated{{modelNamePascal}});
  };

  function handleCta(cta, {{modelNameCamel}}) {
    return async (event) => {
      const state = validate{{modelNamePascal}}({{modelNameCamel}});
      if (state.valid) {
        setValidationState(state);
        return await cta({{modelNameCamel}});
      }

      setValidationState(state);
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
            validationState={validationState.properties['{{propertyNameCamel}}']}
            required={{=<% %>=}}{<%required%>}<%={{ }}=%>
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
