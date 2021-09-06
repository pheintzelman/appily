import { Container } from '@material-ui/core';
import { Header } from '../Header';

export function MessageContainer({ title, message, className }) {
  const classes = ['Container', className].join(' ');

  return (
    <Container maxWidth="sm" className={classes}>
      <Header title={title} />
      <div className="content">
        <h2>{message}</h2>
      </div>
    </Container>
  );
}
