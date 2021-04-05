import React from 'react'
import {Carousel} from 'react-bootstrap'

const Result = ({text, choice}) => {
	const textStyle = {color: 'white'}
	const imgStyle = {
		opacity: '.7',
	}
	return (
		<Carousel>
			<Carousel.Item>
				<img
					style={imgStyle}
					className='d-block w-100'
					src='https://image.freepik.com/free-vector/realistic-blue-yellow-lightning-bolts_107791-3244.jpg'
					alt={text}
				/>
				<Carousel.Caption>
					<h3 style={textStyle}>{text}</h3>
					<p style={textStyle}>
						Nulla vitae elit libero, a pharetra augue mollis
						interdum.
					</p>
				</Carousel.Caption>
			</Carousel.Item>
		</Carousel>
	)
}

export default Result
