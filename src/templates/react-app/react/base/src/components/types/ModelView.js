import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';
import { apiFactory } from '../../api/apiFactory';
import { models } from '../../constants/models';
import './ModelView.scss';

export function ModelView({ label, value, options }) {
  const { model: modelName } = options;
  const [loading, isLoading] = useState(true);
  const [model, setModel] = useState(null);

  async function get(modelName, id) {
    isLoading(true);
    const api = apiFactory(modelName);
    const modelValue = await api.get(id);
    console.log(modelValue);
    setModel(modelValue);
    isLoading(false);
  }

  useEffect(() => {
    get(modelName, value);
  }, [modelName, value]);

  if (loading)
    return (
      <div className="ModelView">
        {label}: <Skeleton className="skeleton" />
      </div>
    );

  const { primaryProperty } = models[modelName];
  return (
    <div className="ModelView">
      {label}:{' '}
      <Link to={`/${modelName}/${value}`}>{model[primaryProperty]}</Link>
    </div>
  );
}
