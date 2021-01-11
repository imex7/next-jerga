import axios from 'axios';
import PortfolioCard from '../../components/portfolio/portfolioCard';
import Link from 'next/link';
import {useState} from "react";

export const deletePortfolioMutation = (id) => {
	const queryText = `
		mutation DeletePortfolio {
			deletePortfolio(id: "${id}")
		}`
	return axios.post(`http://localhost:7003/graphql`, { query: queryText })
		.then(res => res.data.data)
		.then(data => data.deletePortfolio)
}

export const updatePortfolioMutation = (id) => {
	const queryText = `
		mutation UpdatePortfolio {
			updatePortfolio(id: "${id}", p: {
				title: "UPDATED",
				company: "UPDATED",
				companyWebsite: "www.boogle.com",
				location: "Krsk, Russia",
				jobTitle: "Engineer",
				description: "=====>>GOLOLOL",
				startDate: "30/12/2020",
				endDate: "30/12/2020"
			}) {
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
		.then(data => data.updatePortfolio)
}

export const createPortfolioMutation = () => {
	const queryText = `
		mutation CreatePortfolio{
			createPortfolio(p: {
				title: "New",
				company: "New",
				companyWebsite: "www.boogle.com",
				location: "Krsk, Russia",
				jobTitle: "Engineer",
				description: "LOLOLOLOLOLOLOLOL",
				startDate: "30/12/2020",
				endDate: "30/12/2020"
			}) {
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
		.then(data => data.createPortfolio)
}

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

const Portfolios = ({ data}) => {
	const [portfolios, setPortfolios] = useState(data)

	const createPortfolio = async () => {
		const np = await createPortfolioMutation()
		const newPortfolios = [np, ...portfolios]
		setPortfolios(newPortfolios)
	}

	const updatePortfolio = async (id) => {
		const np = await updatePortfolioMutation(id)
		const index = portfolios.findIndex(p => p._id === id)
		const newPortfolios = [...portfolios]
		newPortfolios[index] = np
		setPortfolios(newPortfolios)
	}

	const deletePortfolio = async (id) => {
		const deleted = await deletePortfolioMutation(id)
		const index = portfolios.findIndex(p => p._id === deleted)
		const newPortfolios = [...portfolios]
		newPortfolios.splice(index, 1)
		setPortfolios(newPortfolios)
	}

	return <>
		<section className="section-title">
			<div className="px-2">
				<div className="pt-5 pb-4">
					<h1>Portfolios </h1>
				</div>
				<button
					className="btn btn-primary"
					onClick={createPortfolio}
				>
					Create Portfolio
				</button>
			</div>
			{/* <button className="btn btn-primary" onClick={fetchPortfolios}>Fetch data</button> */}
		</section>
		<section className="pb-5">
			<div className="row">
				{
					portfolios.map((el) => {
						return <div className="col-md-4" key={el._id}>
							<Link href='/portfolios/[id]' as={`/portfolios/${el._id}`}>
								<a className="card-link">
									<PortfolioCard portfolio={el} />
								</a>
							</Link>
							<button className="btn btn-warning"
								onClick={() => {updatePortfolio(el._id)}}>Update Portfolio</button>			
							<button className="btn btn-danger"
								onClick={() => {deletePortfolio(el._id)}}>Delete Portfolio</button>			
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
			data: portfolios
		}
	}
}

export default Portfolios;