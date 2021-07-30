import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Home } from './components/Home';
{{#models}}
import { {{modelNamePascal}}Router } from './components/{{modelNamePascal}}/{{modelNamePascal}}Router';
{{/models}}
import { Header } from "./components/App/Header";
import './App.scss';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
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
