import { gql } from '@apollo/client';

export const create_portfolio = gql`
	mutation CreatePortfolio {
		createPortfolio(p: {
			title: "New",
			company: "New",
			companyWebsite: "www.boogle.com",
			location: "Krsk, Russia",
			jobTitle: "Engineer",
			description: "LOLOLOLOLOLOLOLOL",
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
	}
`

export const update_portfolio = gql`
  mutation UpdatePortfolio($id: ID) {
		updatePortfolio(id: $id, p: {
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
	}
`

export const delete_portfolio = gql`
	mutation DeletePortfolio($id: ID) {
		deletePortfolio(id: $id)
	}
`