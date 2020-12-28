import { Nav, Navbar } from 'react-bootstrap';
import Link from 'next/link';

const AppNavbar = () => {
	return <>
		<div className="navbar-wrapper">
			<Navbar expand="lg" className="navbar-dark fj-mw9">
				<Link className="mr-3" href="/">
					<a className="navbar-brand mr-3 font-weight-bold">FilipJerga</a>
				</Link>
				<Navbar.Toggle />
				<Navbar.Collapse>
					<Nav className="mr-auto">
						<Link className="mr-3" href="/portfolios">
							<a className="nav-link">Portfolios</a>
						</Link>
						<Link className="mr-3" href="/forum/categories">
							<a className="nav-link">Forum</a>
						</Link>
						<Link className="mr-3" href="/forum/categories">
							<a className="nav-link">Cv</a>
						</Link>
						<Link className="mr-3" href="/test">
							<a className="nav-link">Test</a>
						</Link>
					</Nav>
					<Nav>
						<Link className="mr-3" href="/login">
							<a className="nav-link" href="#">Sign In</a>
						</Link>
						<Link className="mr-3" href="/register">
							<a className="btn btn-success bg-green-2 bright" href="#">Sign Up</a>
						</Link>
					</Nav>
				</Navbar.Collapse>
				{/* <Link href={'/'} as={'/'}>
					<a className="navbar-brand mr-3 font-weight-bold" href="#">FilipJerga</a>
				</Link> */}
				{/* <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
					<span className="navbar-toggler-icon"></span>
				</button>
				<div className="collapse navbar-collapse" id="navbarSupportedContent">


				</div> */}
			</Navbar>
		</div>
	</>
}

export default AppNavbar;