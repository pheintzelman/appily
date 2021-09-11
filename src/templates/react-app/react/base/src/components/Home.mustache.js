import { List, ListItem, ListItemText } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { ContentContainer } from "./common/containers/ContentContainer";

export function Home() {
  return (
    <ContentContainer title="Welcome to {{ appName }}!">
      <div className="content">
        <List component="nav">
        {{#models}}
          <ListItem button component={Link} to="/{{pluralModelNamePascal}}">
            <ListItemText primary="{{pluralModelName}}" />
          </ListItem>
        {{/models}}
        </List>
      </div>
    </ContentContainer>
  );
}
