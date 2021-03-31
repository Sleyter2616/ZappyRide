import {BrowserRouter, Route} from 'react-router-dom'
import React from 'react'
import {Container} from 'react-bootstrap'
import Header from './components/Header'
import Footer from './components/Footer'

const App = () => {
	return (
		<BrowserRouter>
			<Header />
			<main className='py 3'>
				<Container>MAIN</Container>
			</main>
			<Footer />
		</BrowserRouter>
	)
}

export default App
