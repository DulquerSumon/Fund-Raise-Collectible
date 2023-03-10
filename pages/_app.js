import { Web3ReactProvider } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";
import { IntegratingProvider } from "../components/AppContext";
import "../styles/globals.css";

const getLibrary = (provider) => {
  return new Web3Provider(provider);
};

function MyApp({ Component, pageProps }) {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <IntegratingProvider>
        <Component {...pageProps} />
      </IntegratingProvider>
    </Web3ReactProvider>
  );
}
export default MyApp;
