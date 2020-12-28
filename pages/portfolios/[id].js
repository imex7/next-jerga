import React from 'react';
import axios from 'axios';
import { fetchPortfolios } from './index';

const fetchPortfolioById = (id) => {
	const queryText = `
			query Portfolio($id: ID) {
				portfolio(id: $id) {
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
	const variables = {id}
	return axios.post(`http://localhost:7003/graphql`, { query: queryText, variables })
		.then(res => res.data.data)
		.then(data => data.portfolio)
}

const PortfolioDetail = ({portfolio}) => {
	return <>
		<div className="portfolio-detail">
			<div className="container">

				<div className="jumbotron">
					<h1 className="display-3">{portfolio.title}</h1>
					<p className="lead">{portfolio.jobTitle}</p>
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
						<p className="text">{portfolio.startDate}</p>
					</div>

					<div className="col-lg-6">
						{/* TODO: days later... */}
						<h4 className="title">Days</h4>
						<p className="text">44</p>

						<h4 className="title">End Date</h4>
						<p className="text">{portfolio.endDate}</p>
					</div>
					<div className="col-md-12">
						<hr />
						<h4 className="title">Description</h4>
						<p>{portfolio.description}</p>
					</div>
				</div>
			</div>
		</div>
	</>
}

export const getStaticPaths = async () => {
	const p = await fetchPortfolios()
	const paths = p.map((el) => ({
		params: { id: el._id },
	}))

	return { paths, fallback: false }
}

export const getStaticProps = async ({params}) => {
	const portfolio = await fetchPortfolioById(params.id)
	// console.log(portfolio);
	return {
		props: {
			portfolio
		}
	}
}


export default PortfolioDetail;