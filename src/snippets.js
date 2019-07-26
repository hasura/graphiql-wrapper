const javascript = {
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
  generate: (config) => {
    // we only render the first operation here
    const {serverUrl, operationDataList, options} = config;
    const {query} = operationDataList[0];
    console.log(query);
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

const snippets = [
  javascript,
];

export default snippets;