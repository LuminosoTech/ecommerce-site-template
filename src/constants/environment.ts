const baseUrl = () => {
  switch (process.env.NODE_ENV) {
    case "production":
      return "https://api.luminoso.tech";
    case "development":
      return `http://localhost:5000`;
  }
};

const getLuminosoSdk = () => {
  return process.env.REACT_APP_LUMINOSO_SDK_TOKEN!!;
};

const environment = {
  BASE_URL: baseUrl(),
  LUMINOSO_SDK_TOKEN: getLuminosoSdk(),
};

export default environment;
