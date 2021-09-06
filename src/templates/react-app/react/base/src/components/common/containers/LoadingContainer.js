import { Container, CircularProgress } from '@material-ui/core';
import { Header } from '../Header';
import { Center } from '../Center';

export function LoadingContainer({ title, className }) {
  const classes = ['Container', className].join(' ');

  return (
    <Container maxWidth="sm" className={classes}>
      <Header title={title} />
      <Center className="loading">
        <CircularProgress />
      </Center>
    </Container>
  );
}
