
import Document, { DocumentContext, Html, Head, Main, NextScript } from 'next/document';


class MyDocument extends Document {

    static async getInitialProps(ctx: DocumentContext) {
        const initalProps = await Document.getInitialProps(ctx)

        return initalProps
    }

    render() {
        return (
          <Html lang="es">
            <Head>
              <meta charSet="utf-8" />
              <meta name="description" content="Esta pagina es un desarrollo de aprendizaje" />
              <meta
                name="keywords"
                content="open jira, administrador, ayudador"
              />
              <meta name="author" content="Percy Zavala" />
              <link rel="icon" href="/favicon.ico" />
              <link
                rel="stylesheet"
                href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
              />
            </Head>
            <body>
              <Main />
              <NextScript />
            </body>
          </Html>
        );
    }
}

export default MyDocument