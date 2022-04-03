import Document, {
  Head,
  Html,
  Main,
  NextScript,
} from 'next/document';

import AppConfig from "../utils/AppConfig";

class MyDocument extends Document {
  static async getInitialProps(ctx: any) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {

    return (
      <Html lang={AppConfig.locale} translate="no">
        <Head>
          {/* <script
            async
            src="https://www.googletagmanager.com/gtag/js?id=G-WSWRTVLRTD"
          ></script> */}
          <script
            dangerouslySetInnerHTML={{
              __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-WSWRTVLRTD');
            `,
            }}
          />
          <link rel="preload" href="/fonts/upheaval/upheavtt.ttf" as="font" crossOrigin="" />
          <link rel="preload" href="/fonts/coolvetica/coolvetica_rg.otf" as="font" crossOrigin="" />
          <link rel="preload" href="/fonts/sansation/Sansation_Light.ttf" as="font" crossOrigin="" />
          <link rel="preload" href="/fonts/spacex-free/SpaceX_FREE_FOR_PERSONAL_USE.ttf" as="font" crossOrigin="" />
          <link rel="preload" href="/fonts/poppins/Poppins-Bold.ttf" as="font" crossOrigin="" />
          <link rel="preload" href="/fonts/poppins/Poppins-Medium.ttf" as="font" crossOrigin="" />
          <link rel="preload" href="/fonts/poppins/Poppins-Light.ttf" as="font" crossOrigin="" />
          <link rel="preload" href="/fonts/Nosifer/Nosifer-Regular.ttf" as="font" crossOrigin="" />
          <link rel="preload" href="/fonts/Kanit/Kanit-Bold.ttf" as="font" crossOrigin="" />
          <link rel="preload" href="/fonts/Kanit/Kanit-Medium.ttf" as="font" crossOrigin="" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
