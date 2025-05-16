export const serverPort = import.meta.env.VITE_GQL_PORT || `4000`;
export const serverUrl = import.meta.env.VITE_GQL_HOST || `localhost`;
export const serverScheme = import.meta.env.VITE_GQL_SCHEME || `http`;

export const isDev = () => {
  return import.meta.env.NODE_ENV !== `production`;
};

export const sideBarWithNoCollapse = 250;
export const sideBarWithCollapse = 50;
