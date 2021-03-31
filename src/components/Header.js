import React from 'react'
import {NavDropdown, Nav, Navbar, Container} from 'react-bootstrap'
import {LinkContainer} from 'react-router-bootstrap'

const Header = () => {
	//Simple Header with navigation in case we want to add more navigation in the future

	return (
		<header>
			<Navbar bg='dark' variant='dark' expand='lg' collapseOnSelect>
				<Container>
					<LinkContainer to='/'>
						<Navbar.Brand>
							Electric Vehicle Information
						</Navbar.Brand>
					</LinkContainer>
					<Navbar.Toggle aria-controls='basic-navbar-nav' />
					<Navbar.Collapse id='basic-navbar-nav'>
						<Nav className='ml-auto'>
							<LinkContainer to='/input'>
								<Nav.Link>
									<i className='fas fa-info-circle' />
									Input Field
								</Nav.Link>
							</LinkContainer>
						</Nav>
					</Navbar.Collapse>
				</Container>
			</Navbar>
		</header>
	)
}

export default Header
