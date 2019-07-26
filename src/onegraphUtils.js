import Explorer from 'graphiql-explorer';

export const makeDefaultArg = () => {
  return false;
};

export const getDefaultScalarArgValue = (parentField, arg, argType) => {
  return Explorer.defaultValue(argType);
};