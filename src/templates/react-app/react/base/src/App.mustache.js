import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Home } from './components/Home';
{{#models}}
import { {{modelNamePascal}}Router } from './components/{{modelNamePascal}}/{{modelNamePascal}}Router';
{{/models}}
import { AppHeader } from "./components/App/AppHeader";
import './App.scss';

function App() {
  return (
    <Router>
      <div className="App">
        <AppHeader />
        <Switch>
        {{#models}}
          <Route path={["/{{modelNamePascal}}", "/{{pluralModelNamePascal}}"]}>
            <{{modelNamePascal}}Router />
          </Route>
          {{/models}}
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
