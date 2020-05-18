import App, { AppContext } from "next/app";
import { Container } from "semantic-ui-react";

import "semantic-ui-css/semantic.min.css";
import "./styles.css";

const MyApp = ({ Component, pageProps }: any) => {
  return (
    <>
      <Container>
        <Component {...pageProps} />
      </Container>
    </>
  );
};

MyApp.getInitialProps = async (context: AppContext) => {
  console.log("GET INITIAL PROPS _APP");
  const initialProps =
    App.getInitialProps && (await App.getInitialProps(context));
  return {
    pageProps: { appData: "Hello _App Component", ...initialProps.pageProps },
  };
};

export default MyApp;
