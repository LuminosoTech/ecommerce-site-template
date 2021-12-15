const getLuminosoSdk = () => {
  return process.env.REACT_APP_LUMINOSO_SDK_TOKEN!!;
};

const environment = {
  LUMINOSO_SDK_TOKEN: getLuminosoSdk(),
};

export default environment;
