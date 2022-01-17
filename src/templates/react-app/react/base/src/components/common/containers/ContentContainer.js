import { Container } from "@material-ui/core";
import { Header } from "../Header";
import { LoadingContainer } from "./LoadingContainer";
import { ErrorContainer } from "./ErrorContainer";
import "./ContentContainer.scss";

export function ContentContainer({
  title,
  children,
  className,
  loading,
  error,
  actions,
}) {
  const classes = ["Container", "ContentContainer", className].join(" ");

  if (error) {
    return <ErrorContainer title={title} error={error} className={classes} />;
  }

  if (loading) {
    return <LoadingContainer title={title} className={classes} />;
  }

  return (
    <Container maxWidth="sm" className={classes}>
      <Header title={title} actions={actions} />
      {children}
    </Container>
  );
}
