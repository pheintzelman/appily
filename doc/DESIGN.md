## Core Principal

1. Deliver value early
2. Generate code people would write
3. Favor modifiability over dry, avoid coupling between models this allows users to easly modify the application. e.g. a compoinet per model is better than a single "magic" component
4. Be opinionated
5. Don't cover all usecases
6. Support templating to increase flexibility

## App Design

Models first design, models control the UI, API and DB.

A model is a collection of properties. Properties can be a

- String
- Number
- Boolean
- Model
- Collection of Model
- Enum

Through the UI a model can be

- created
- viewed
- edited
- deleted
- associated with a model
- unassociated with a model

Here is an example Model

```js
{ Dog: {
  name: 'String',
  breed: 'Breed'
  weight: {type: 'Number', unit: 'lbs'},
  owner: 'Person'
}}
```

Example of the model View:

### Dog

```
name: Spot
<breed>
weight: 120 lbs
<owner>
```

If a model has a collection of models than its children are also displayed.

Linking between models handles circular references and needed nesting.
