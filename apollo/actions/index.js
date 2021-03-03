import { useQuery, useMutation } from '@apollo/client'
import { fetch_portfolios } from '@/apollo/queries'
import { create_portfolio, delete_portfolio, update_portfolio } from '@/apollo/mutations'

export const fetchPortfoliosAction = () => useQuery(fetch_portfolios)
export const updOldPortfolioAction = () => useMutation(update_portfolio)
export const addNewPortfolioAction = () => useMutation(create_portfolio, {
	update(cache, { data: { createPortfolio } }) {
		const { portfolios } = cache.readQuery({ query: fetch_portfolios })
		cache.writeQuery({
			query: fetch_portfolios,
			data: { portfolios: [createPortfolio, ...portfolios,] }
		})
	}
})
export const removeOldPortfolioAction = () => useMutation(delete_portfolio, {
	update(cache, { data: { delete_portfolio } }) {
		const { portfolios } = cache.readQuery({ query: fetch_portfolios })
		const newPortfolios = portfolios.filter(p => p._id !== delete_portfolio)
		cache.writeQuery({
			query: fetch_portfolios,
			data: { portfolios: newPortfolios }
		})
	}
})
