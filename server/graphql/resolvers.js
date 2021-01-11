const {data} = require('./data')

exports.portfolioQueries = {
	hello: () => {
		return 'Boo! Moo!'
	},
	portfolio: (root, { id }) => {
		const p = data.portfolios.find((el) => el._id === id)
		return p
	},
	portfolios: () => {
		return data.portfolios
	}
}

exports.portfolioMutations = {
	createPortfolio: (root, {p}) => {
		const id = require('crypto').randomBytes(10).toString('hex')
		const newPortfolio = {...p}
		newPortfolio._id = id
		data.portfolios.unshift(newPortfolio)
		return newPortfolio
	},
	updatePortfolio: (root, {id, p}) => {
		const index = data.portfolios.findIndex((el) => {
			return el._id === id
		})
		const oldPortfolio = data.portfolios[index]
		const newPortfolio = {...oldPortfolio, ...p}
		data.portfolios[index] = newPortfolio
		return newPortfolio
	},
	deletePortfolio: (root, {id}) => {
		console.log(root);
		const index = data.portfolios.findIndex((el) => {
			return el._id === id
		})
		data.portfolios.splice(index, 1)
		return id
	}
}