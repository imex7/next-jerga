import axios from 'axios';
import PortfolioCard from '../../components/portfolio/portfolioCard';
import Link from 'next/link';
import {useState, useEffect} from "react";
import { useQuery, useMutation } from '@apollo/client'
import { fetch_portfolios } from '@/apollo/queries'
import { create_portfolio, delete_portfolio, update_portfolio } from '@/apollo/mutations'

const Portfolios = () => {
	const {loading, error, data} = useQuery(fetch_portfolios)
	const [addNewPortfolio] = useMutation(create_portfolio, {
		update(cache, {data: {createPortfolio}}) {
			const {portfolios} = cache.readQuery({query: fetch_portfolios})
			cache.writeQuery({
				query: fetch_portfolios,
				data: {portfolios: [createPortfolio, ...portfolios, ]}
			})
		}
	})
	const [removeOldPortfolio] = useMutation(delete_portfolio)
	const [updOldPortfolio] = useMutation(update_portfolio)
	const [portfolios, setPortfolios] = useState()

	useEffect(() => {
		if (loading === false) {
			setPortfolios(data.portfolios)
		} else {
			return
		}
	}, [loading])

	const createP = async () => {
		const np = await addNewPortfolio()
		// console.log(np.data.createPortfolio)
		const newPortfolios = [np.data.createPortfolio, ...portfolios]
		setPortfolios(newPortfolios)
	}

	const updateP = async (id) => {
		const up = await updOldPortfolio({variables: {id}})
		console.log(up.data.updatePortfolio)
		const updated = up.data.updatePortfolio._id
		const index = portfolios.findIndex(p => p._id === updated)
		const newPortfolios = [...portfolios]
		newPortfolios[index] = up.data.updatePortfolio
		setPortfolios(newPortfolios)
	}

	const deleteP = async (id) => {
		const dp = await removeOldPortfolio({variables: {id}})
		console.log(dp.data.deletePortfolio)
		const deleted = dp.data.deletePortfolio
		const index = portfolios.findIndex(p => p._id === deleted)
		const newPortfolios = [...portfolios]
		newPortfolios.splice(index, 1)
		setPortfolios(newPortfolios)
	}

	if (loading || portfolios === undefined) {
		return <h1>Loading ...</h1>;
	}
	if (error) {
		return <h1>Error...</h1>
	}

	return <>
		<section className="section-title">
			<div className="px-2">
				<div className="pt-5 pb-4">
					<h1>Portfolios </h1>
				</div>
				<button
					className="btn btn-primary"
					onClick={createP}
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
								onClick={() => {updateP(el._id)}}>Update Portfolio</button>
							<button className="btn btn-danger"
								onClick={() => {deleteP(el._id)}}>Delete Portfolio</button>
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

// export const getStaticProps = async (ctx) => {
// 	const portfolios = await fetchPortfolios()
// 	return {
// 		props: {
// 			data: portfolios
// 		}
// 	}
// }

export default Portfolios;