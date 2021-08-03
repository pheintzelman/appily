import { Container, List, ListItem, ListItemText } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { Header } from "./common/Header";

export function Home() {
  return (
    <Container maxWidth="sm" className="Container Home">
       <Header title="Welcome to {{ appName }}!"/>
       <div className="containerContent">
        <List component="nav">
        {{#models}}
          <ListItem button component={Link} to="/{{pluralModelNamePascal}}">
            <ListItemText primary="{{pluralModelName}}" />
          </ListItem>
        {{/models}}
        </List>
      </div>
    </Container>
  );
}
