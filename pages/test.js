function Test({ message, drinks }) {
	return <>
		<div>
			<h2>Test</h2>
			{/* <pre>{JSON.stringify(drinks, null, 4)}</pre> */}
			{/* <pre>{JSON.stringify(message, null, 4)}</pre> */}
			<ul class="list-group">
				{
					drinks.map((el) => {
						return <li class="list-group-item p-2">
							<img src={el.strDrinkThumb} height="80" style={{borderRadius: '5px'}}/>
							<span style={{fontSize: '1.5em', marginLeft: '10px'}}>{el.strDrink}</span>
						</li>
					})
				}
			</ul>
		</div>
		<style jsx>{`
			h2 {
				color: blue;
				letter-spacing: 5px
			}
		`}</style>
	</>
}

const apiCall = () => {
	return new Promise((res, rej) => {
		setTimeout(() => {
			res({ message: 'We get IT!!! YYY' })
		}, 200)
	})
}

// Test.getInitialProps = async (ctx) => {
// 	if (!ctx.req) {
// 		return {
// 			message: 'LoLoLo'
// 		}
// 	}
// 	const data = await apiCall()
// 	return {
// 		...data
// 	}
// }

const fetchingData = () => {
	return fetch(`https://thecocktaildb.com/api/json/v1/1/filter.php?c=Cocktail`)
		.then(res => res.json())
		.then(res => res.drinks)
}

export async function getStaticProps() {
	console.log('TEST GETSTATICPROPS CALLED!!!');
	const drinks = await fetchingData()
	return {
		props: { message: 'My Title', drinks}
	}
}

// export const getServerSideProps = async (ctx) => {
// 	const data = await apiCall()
// 	return { props: { message: data } };
// };

export default Test;