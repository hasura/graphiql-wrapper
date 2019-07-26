import { useState, useEffect } from 'react';
import { getIntrospectionQuery, buildClientSchema } from 'graphql';

export const useSchema = () => {
  const [schema, setSchema] = useState(null);
  const fetchSchema = () => {
    fetch(
      'https://bazookaand.herokuapp.com/v1alpha1/graphql',
      {
        method: 'POST',
        body: JSON.stringify({
          query: getIntrospectionQuery()
        })
      }
    ).then(r => r.json())
    .then(r => {
      setSchema(buildClientSchema(r.data));
    })
  };
  const fetcher = (params) => {
    return fetch('https://bazookaand.herokuapp.com/v1alpha1/graphql', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params),
    }).then(response => response.json());
  };
  useEffect(fetchSchema, []);
  return {
    schema,
    fetcher
  };
};