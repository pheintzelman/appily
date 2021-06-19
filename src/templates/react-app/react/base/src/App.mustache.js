import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Home } from './components/Home';
{{#models}}
import { {{modelNamePascal}}Form } from './components/{{modelNamePascal}}Form';
{{/models}}
import './App.scss';

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
        {{#models}}
          <Route path="/{{modelNamePascal}}">
            <{{modelNamePascal}}Form />
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
