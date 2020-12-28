import '@/styles/styles.scss'
import 'bootstrap/scss/bootstrap.scss';
import App from 'next/app';
import AppNavbar from '@/components/shared/navbar';
import Hero from '@/components/shared/hero';

function MyApp({ Component, pageProps }) {
  return <>
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
