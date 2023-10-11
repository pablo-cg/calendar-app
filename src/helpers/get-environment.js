export function getEnvVariables() {
  import.meta.env;
  return {
    ...import.meta.env,
  };
}
