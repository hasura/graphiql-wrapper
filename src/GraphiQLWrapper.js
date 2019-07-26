import React, { useState } from 'react';
import GraphiQL from 'graphiql';
import Explorer from 'graphiql-explorer';
import Exporter from 'graphiql-code-exporter';
import { parse, print } from 'graphql';
import {
  makeDefaultArg,
  getDefaultScalarArgValue 
} from './onegraphUtils';
import snippets from './snippets';

const GraphiQLWrapper = (props) => {

  const [query, setQuery] = useState('');
  const [variables, setVariables] = useState('');
  const [explorerOpen, setExplorerOpen] = useState(false);
  const [exporterOpen, setExporterOpen] = useState(false);

  const {
    schema,
    fetcher,
    buttons,
    onToggleHistory,
    onEditQuery,
    onEditVariables
  } = props;

  let graphiqlContext;

  const getGraphiqlBUttons = () => {
    let graphiqlButtons = buttons || [];
    graphiqlButtons.push({
      title: "Prettify Query (Shift-Ctrl-P)",
      label: "Prettify",
      onClick: () => {
        const editor = graphiqlContext.getQueryEditor();
        const currentText = editor.getValue();
        const prettyText = print(parse(currentText));
        editor.setValue(prettyText);
      }
    });

    graphiqlButtons.push({
      title: "Show History",
      label: "History",
      onClick: () => {
        if (typeof onToggleHistory === 'function') {
          onToggleHistory(!this.state.historyPaneOpen);
        }
        graphiqlContext.setState({ historyPaneOpen: !graphiqlContext.historyPaneOpen });
      }
    });

    graphiqlButtons.push({
      title: 'Toggle explorer',
      label: 'Explorer',
      onClick: () => setExplorerOpen(!explorerOpen)
    })

    graphiqlButtons.push({
      title: 'Code Exporter',
      label: 'Code Exporter',
      onClick: () => setExporterOpen(!exporterOpen)
    })
    return graphiqlButtons.map(b => <GraphiQL.Button key={b.label} {...b}/>)
  };

  const handleQueryEdit = (q) => {
    setQuery(q);
    if (typeof onEditQuery === "function") {
      onEditQuery(q);
    }
  };
  const handleVariableEdit = (v) => {
    setVariables(v);
    if (typeof onEditVariables === "function") {
      onEditVariables(v);
    }
  };

  const graphiql = (
    <GraphiQL
      schema={schema}
      fetcher={fetcher}
      ref={c => { graphiqlContext = c; }}
      onEditQuery={handleQueryEdit}
      onEditVariables={handleVariableEdit}
      query={query}
      variables={variables}
    >
      <GraphiQL.Toolbar>
        {getGraphiqlBUttons()}
      </GraphiQL.Toolbar>
      <GraphiQL.Footer>
        {
          //todo
          null
        }
      </GraphiQL.Footer>
    </GraphiQL>
  );

  const explorer = (
    <Explorer
      schema={schema}
      query={query}
      onEdit={setQuery}
      onRunOperation={operationName =>
        graphiqlContext.handleRunQuery(operationName)
      }
      explorerIsOpen={explorerOpen}
      onToggleExplorer={() => setExplorerOpen(!explorerOpen)}
      getDefaultScalarArgValue={getDefaultScalarArgValue}
      makeDefaultArg={makeDefaultArg}
    />
  );

  const exporter = exporterOpen && (
    <Exporter
      hideCodeExporter={() => setExporterOpen(!exporterOpen)}
      query={query}
      snippets={snippets}
      variables={variables}
    />
  );

  return (
    <div className="graphiql-container">
      {explorer}
      {graphiql}
      {exporter}
    </div>
  );
};

export default GraphiQLWrapper;