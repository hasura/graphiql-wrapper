const snippets = [
  {
    language: 'JavaScript',
    prismLanguage: 'javascript',
    name: 'Fetch API',
    options: [
      {
        id: 'server',
        label: 'server-side usage',
        initial: false,
      },
    ],
    generate: ({serverUrl, operations, options}) => {
      // we only render the first operation here
      const {query} = operations[0];

      const serverImport = options.server
        ? 'import { fetch } from "node-fetch"'
        : '';

      return `
  ${serverImport}

  const res = await fetch("${serverUrl}", {
    method: 'POST',
    body: JSON.stringify({ query: \`${query}\` }),
  })
  const { errors, data } = await res.json()

  // Do something with the response
  console.log(data, errors)
  `;
    },
  }
];

export default snippets;