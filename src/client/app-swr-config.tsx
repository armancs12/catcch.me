import { SWRConfig } from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const AppSWRConfig: React.FC = ({ children }) => {
  return (
    <SWRConfig
      value={{
        fetcher,
      }}
    >
      {children}
    </SWRConfig>
  );
};

export default AppSWRConfig;
