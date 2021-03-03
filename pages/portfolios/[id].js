import React from 'react';
import { useQuery } from '@apollo/client'
import { get_portfolio_by_id, fetch_portfolios } from '@/apollo/queries'
import { apolloClient } from '../_app'
import withApollo from '@/hoc/withApollo'

const PortfolioDetail = ({id}) => {
	const {loading, error, data} = useQuery(get_portfolio_by_id, {variables: {id}})
	if (loading) {
		return <h1>Loading ...</h1>;
	}
	if (error) {
		return <h1>Error...</h1>
	}
	return data.portfolio && <>
		<div className="portfolio-detail">
			<div className="container">

				<div className="jumbotron">
					<h1 className="display-3">{data.portfolio.title}</h1>
					<p className="lead">{data.portfolio.jobTitle}</p>
					<p>
						<a className="btn btn-lg btn-success" href="#" role="button">
							See Company</a>
					</p>
				</div>

				<div className="row marketing">
					<div className="col-lg-6">
						<h4 className="title">Location</h4>
						<p className="text">Some Location</p>

						<h4 className="title">Start Date</h4>
						<p className="text">{data.portfolio.startDate}</p>
					</div>

					<div className="col-lg-6">
						{/* TODO: days later... */}
						<h4 className="title">Days</h4>
						<p className="text">44</p>

						<h4 className="title">End Date</h4>
						<p className="text">{data.portfolio.endDate}</p>
					</div>
					<div className="col-md-12">
						<hr />
						<h4 className="title">Description</h4>
						<p>{data.portfolio.description}</p>
					</div>
				</div>
			</div>
		</div>
	</>
}

export const getStaticPaths = async () => {
	let res = await apolloClient.query({
		query: fetch_portfolios
	})
	.then(result => {
		return result
	});
	const paths = res.data.portfolios.map((el) => {
		// console.log(el._id);
		return {
			params: { 
				id: el._id
			},
		}
	})
	return { 
		paths,
		fallback: false
	}
}

export const getStaticProps = async ({params}) => {
	// const p = await fetchPortfolioById(params.id)
	// console.log(portfolio);
	return {
		props: {
			id: params.id
		}
	}
}

export const getInitialProps = async ({query}) => {
	console.log('sdlkf;dlk');
	return {
		query
	}
}


export default PortfolioDetail
// export default withApollo(PortfolioDetail);