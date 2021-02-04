import '@/styles/styles.scss'
// import App from 'next/app';
import 'bootstrap/scss/bootstrap.scss';
import { ApolloClient, InMemoryCache } from '@apollo/client'
import { ApolloProvider } from '@apollo/client'
import AppNavbar from '@/components/shared/navbar';
import Hero from '@/components/shared/hero';

export const apolloClient = new ApolloClient({
  uri: 'http://localhost:7003/graphql',
  cache: new InMemoryCache()
})

function MyApp({ Component, pageProps }) {
  return <>
  <ApolloProvider client={apolloClient}>
    <div className="portfolio-app">
      <AppNavbar />
      {/* <pre>{JSON.stringify(pageProps.appData, null, 4)}</pre> */}
      {Component.name === 'Home' && <Hero />}
      <div className="container">
        <Component {...pageProps} />
      </div>
      {Component.name === 'Home' && <footer id="sticky-footer" className="py-4 bg-black text-white-50 py-3">
        <div className="container text-center">
          <small>Copyright &copy; Your Website</small>
        </div>
      </footer>}
    </div>
  </ ApolloProvider>
  </>
}

// MyApp.getInitialProps = async (context) => {
//   const initProps = App.getInitialProps && App.getInitialProps(context)
//   return {
//     pageProps: {
//       appData: 'Hello', ...(await initProps).pageProps
//     }
//   }
// }

export default MyApp
