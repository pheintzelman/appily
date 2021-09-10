import { Link } from 'react-router-dom';

export function ModelView({ label, value, options }) {
  const { model } = options;
  return <Link to={`/${model}/${value}`}>{label}</Link>;
}
