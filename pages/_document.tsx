import { Head, Html, Main, NextScript } from 'next/document';

const Document = () => (
  <Html lang="en">
    <Head>
      <link rel="apple-touch-icon" sizes="57x57" href="/icon.svg" />
      <link rel="apple-touch-icon" sizes="60x60" href="/icon.svg" />
      <link rel="apple-touch-icon" sizes="72x72" href="/icon.svg" />
      <link rel="apple-touch-icon" sizes="76x76" href="/icon.svg" />
      <link rel="apple-touch-icon" sizes="114x114" href="/icon.svg" />
      <link rel="apple-touch-icon" sizes="120x120" href="/icon.svg" />
      <link rel="apple-touch-icon" sizes="144x144" href="/icon.svg" />
      <link rel="apple-touch-icon" sizes="152x152" href="/icon.svg" />
      <link rel="apple-touch-icon" sizes="180x180" href="/icon.svg" />
      <link rel="icon" type="image/svg" sizes="192x192" href="/icon.svg" />
      <link rel="icon" type="image/svg" sizes="32x32" href="/icon.svg" />
      <link rel="icon" type="image/svg" sizes="96x96" href="/icon.svg" />
      <link rel="icon" type="image/svg" sizes="16x16" href="/icon.svg" />
      <link rel="manifest" href="/manifest.json" />
      <meta name="msapplication-TileColor" content="#ffffff" />
      <meta name="msapplication-TileImage" content="/icon.svg" />
      <meta name="theme-color" content="#ffffff" />
    </Head>
    <body>
      <Main />
      <NextScript />
    </body>
  </Html>
);

export default Document;
