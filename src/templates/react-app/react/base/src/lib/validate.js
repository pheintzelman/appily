export const Valdator = { Required: 'Required' };
const valdatorMap = { [Valdator.Required]: requiredValdator };
const validState = { valid: true, messages: [] };

function requiredValdator({ property, value }) {
  if (value !== null && value !== undefined && value !== '') {
    return validState;
  }

  return { valid: false, messages: ['required'] };
}

function getValdator({ type }) {
  if (valdatorMap.hasOwnProperty(type)) {
    return valdatorMap[type];
  }

  return () => validState;
}

function validateProperty({ rules, property, value, model }) {
  return rules.reduce((state, rule) => {
    if (rule.name !== property) {
      return state;
    }

    const validator = getValdator(rule);
    const { valid, messages } = validator({
      value,
      property,
      model,
      rule
    });

    return {
      valid: valid && state.valid,
      messages: [...state.messages, ...messages]
    };
  }, validState);
}

export function validate(rules, model) {
  return Object.entries(model).reduce(
    (state, [property, value]) => {
      const propertyState = validateProperty({ rules, property, value, model });
      return {
        valid: state.valid && propertyState.valid,
        properties: {
          ...state.properties,
          [property]: propertyState
        }
      };
    },
    { valid: true, properties: {} }
  );
}
