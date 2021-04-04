import {BrowserRouter, Route} from 'react-router-dom'
import React from 'react'
import {Container} from 'react-bootstrap'

import Header from './components/Header'
import Footer from './components/Footer'
import InputScreen from './Screens/InputScreen'
import Home from './components/Home'

const App = () => {
	return (
		<BrowserRouter>
			<Header />
			<main className='py 3'>
				<Container>
					<Route path='/' exact component={Home} />
					<Route path='/input' component={InputScreen} />
				</Container>
			</main>
			<Footer />
		</BrowserRouter>
	)
}

export default App
