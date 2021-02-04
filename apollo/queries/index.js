import { gql } from '@apollo/client';

export const get_portfolio_by_id = gql`
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

export const fetch_portfolios = gql`
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