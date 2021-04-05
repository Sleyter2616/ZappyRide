import React from 'react'
import {Figure, ProgressBar} from 'react-bootstrap'

const Result = ({text, choice, answer, flat, time}) => {
	const textStyle = {color: 'black'}
	const imgStyle = {
		opacity: '.9',
		backgroundColor: '#004ff9',
	}
	const timePercent = (flat / (flat + time)) * 100
	const flatPercent = (time / (flat + time)) * 100
	console.log(flatPercent, timePercent)
	return (
		<Figure>
			<h3>You choose, the {choice} rate</h3>
			<h4>The best option for you is the {answer} rate</h4>
			<Figure.Caption style={textStyle}>{text}</Figure.Caption>
			<br />
			<Figure.Caption style={textStyle}>Flat Rate Savings</Figure.Caption>
			<ProgressBar striped variant='info' now={flatPercent} key={1} />
			<Figure.Caption style={textStyle}>
				Time of Use Rate Savings
			</Figure.Caption>
			<ProgressBar striped variant='info' now={timePercent} key={2} />
		</Figure>
	)
}

export default Result
