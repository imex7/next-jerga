import axios from 'axios';
import PortfolioCard from '../../components/portfolio/portfolioCard';
import Link from 'next/link';

export const fetchPortfolios = () => {
	const queryText = `
			query Portfolios {
				portfolios {
					_id
					title
					company
					companyWebsite
					location
					jobTitle
					description
					startDate
					endDate
				}
			}`
	return axios.post(`http://localhost:7003/graphql`, { query: queryText })
		.then(res => res.data.data)
		.then(data => data.portfolios)
}

const Portfolios = ({ portfolios}) => {
	// console.log(portfolios);
	return <>
		<section className="section-title">
			<div className="px-2">
				<div className="pt-5 pb-4">
					<h1>Portfolios </h1>
				</div>
			</div>
			{/* <button className="btn btn-primary" onClick={fetchPortfolios}>Fetch data</button> */}
		</section>
		<section className="pb-5">
			<div className="row">
				{
					portfolios.map((el) => {
						return <div className="col-md-4" key={el._id}>
							<Link href='/portfolios/[id]' as={`/portfolios/${el._id}`}>
								<a className="card-link"><PortfolioCard portfolio={el} /></a>
							</Link>
						</div>
					})
				}		
			</div>
		</section>		
	</>
}

// Portfolios.getInitialProps = async (ctx) => {
// 	const portfolios = await fetchPortfolios()
// 	return {
// 		portfolios
// 	}
// }

export const getStaticProps = async (ctx) => {
	const portfolios = await fetchPortfolios()
	return {
		props: {
			portfolios
		}
	}
}

export default Portfolios;