export function getEnvVariables() {
  const meta = import.meta.env;
  return {
    ...meta,
  };
}
