import Layout from '../components/layout'
import Head from 'next/head'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
          <title key="title">BeingFrankly</title>
          <link rel="canonical" href="https://beingfrankly.nl" key="canonical" />
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta name="description" content="Making accessibility more accessible for frontend developers." key="description"/>
          <meta property="og:title" content="BeingFrankly" key="og-title" />
          <meta property="og:description" content="Making accessibility more accessible for frontend developers."/>
          <meta property="og:locale" content="en_GB"/>
          <meta property="og:type" content="website" key="og-type" />
          <meta name="twitter:card" content="summary_large_image"/>
          <meta name="twitter:creator" content="@frank_vaneldijk"/>
          <meta name="twitter:title" content="Frank van Eldijk-Smeding"/>
          <meta name="twitter:description" content="Making accessibility more accessible for frontend developers."/>
          <meta property="og:url" content="https://beingfrankly.nl" key="og-url"/>
          <script async defer data-domain="beingfrankly.nl" src="https://plausible.io/js/plausible.js"></script>
      </Head>
      <Layout><Component {...pageProps} /></Layout>
    </>
  )

}

export default MyApp
