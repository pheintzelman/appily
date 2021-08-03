import { Switch, Route } from 'react-router-dom';
import { Edit{{modelNamePascal}} } from './Edit{{modelNamePascal}}';
import { {{modelNamePascal}} } from './{{modelNamePascal}}';
import { Add{{modelNamePascal}} } from './Add{{modelNamePascal}}';
import { {{modelNamePascal}}Collection } from "./{{modelNamePascal}}Collection";

export function {{modelNamePascal}}Router() {
  return (
    <Switch>
      <Route path="/{{pluralModelNamePascal}}">
        <{{modelNamePascal}}Collection />
      </Route>
      <Route path="/{{modelNamePascal}}/edit/:id">
        <Edit{{modelNamePascal}} />
      </Route>
      <Route path="/{{modelNamePascal}}/:id">
        <{{modelNamePascal}} />
      </Route>
      <Route path="/{{modelNamePascal}}">
        <Add{{modelNamePascal}} />
      </Route>
    </Switch>
  );
}
