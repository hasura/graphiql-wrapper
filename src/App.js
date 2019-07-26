import React from 'react';
import 'graphiql/graphiql.css';
import './App.css';
import { useSchema } from './localDev';
import GraphiQLWrapper from './GraphiQLWrapper';

const App = () => {

  return (
    <div>
      <GraphiQLWrapper
        {...useSchema()}
      />
    </div>
  );
}

export default App;
