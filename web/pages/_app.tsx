import App from "next/app";
import { Container } from "semantic-ui-react";

import Header from "../components/Header";
import "semantic-ui-css/semantic.min.css";
import "./styles.css";

const MyApp = ({ Component, pageProps }: any) => {
  // debugger;
  {
    pageProps.appData;
  }
  return (
    <>
      <Header />
      <Container>
        <Component {...pageProps} />
      </Container>
    </>
  );
};

MyApp.getInitialProps = async (context: any) => {
  console.log("GET INITIAL PROPS _APP");
  const initialProps =
    App.getInitialProps && (await App.getInitialProps(context));
  return {
    pageProps: { appData: "Hello _App Component", ...initialProps.pageProps },
  };
};

export default MyApp;
