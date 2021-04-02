import {BrowserRouter, Route} from 'react-router-dom'
import React from 'react'
import {Container} from 'react-bootstrap'

import Header from './components/Header'
import Footer from './components/Footer'
import InputScreen from './Screens/InputScreen'
import Home from './components/Home'
import ExcelData from './Data/ExcelData'

const App = () => {
	return (
		<BrowserRouter>
			<Header />
			<main className='py 3'>
				<Container>
					<Route path='/' exact component={Home} />
					<Route path='/input' component={InputScreen} />
					<Route path='/excel' component={ExcelData} />
				</Container>
			</main>
			<Footer />
		</BrowserRouter>
	)
}

export default App
