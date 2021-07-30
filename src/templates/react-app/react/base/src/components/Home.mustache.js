import { Container, List, ListItem, ListItemText } from '@material-ui/core';
import { Link } from 'react-router-dom';

export function Home() {
  return (
    <Container maxWidth="sm" className="Container Home">
      <h1>Welcome to {{ appName }}!</h1>
      <List component="nav">
      {{#models}}
        <ListItem button component={Link} to="/{{pluralModelNamePascal}}">
          <ListItemText primary="{{pluralModelName}}" />
        </ListItem>
      {{/models}}
      </List>
    </Container>
  );
}
