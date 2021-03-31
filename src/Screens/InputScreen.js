import React, {useState} from 'react'
import {Form, Button} from 'react-bootstrap'
import TimePicker from 'react-bootstrap-time-picker'
import Message from '../components/Message'

const InputScreen = () => {
	//All neccesary UI states from user inputs
	const [typeRate, setTypeRate] = useState('flat')
	const [milesPerYear, setMilesPerYear] = useState(1000)
	const [startTime, setStartTime] = useState('00:00')
	const [endTime, setEndTime] = useState('06:00')

	// Error handling for the form validation
	const [milesPerYearErr, setMilesPerYearErr] = useState({})
	const [timeErr, setTimeErr] = useState({})

	//All Handlers
	const handleStartTimeChange = (time) => {
		console.log(time) // <- prints "3600" if "01:00" is picked
		setStartTime(time)
	}
	const handleEndTimeChange = (time) => {
		console.log(time) // <- prints "3600" if "01:00" is picked
		setEndTime(time)
	}
	const onSubmit = (e) => {
		e.preventDefault()
		const isValid = formValidation()
	}
	const formValidation = () => {
		const timeErr = {}
		const milesPerYearErr = {}
		let isValid = true
		console.log(startTime, endTime)
		if (startTime === endTime) {
			timeErr.timesMustDiffer =
				'The start time and the end time must differ'
			isValid = false
		}
		//Regex pattern for numbers
		const numPattern = /^\d+$/
		if (!numPattern.test(milesPerYear)) {
			milesPerYearErr.mustBeNum = 'Miles per Year must be a number'
			isValid = false
		}
		if (milesPerYear < 1000) {
			milesPerYearErr.notInRange =
				'The miles per year must be at least 1,000'
			isValid = false
		}
		if (milesPerYear > 200000) {
			milesPerYearErr.notInRange =
				'The miles per year must be maximum 200,000 Miles'
			isValid = false
		}

		setMilesPerYearErr(milesPerYearErr)
		setTimeErr(timeErr)
		return isValid
	}
	return (
		<div>
			<Form className='py-4' onSubmit={onSubmit}>
				<Form.Group controlId='typeOfRate'>
					<Form.Label>Which rate are you currently on?</Form.Label>
					<Form.Control
						as='select'
						value={typeRate}
						onChange={(e) => setTypeRate(e.target.value)}
					>
						<option value={'flat'}>Flat Rate of $0.15/kWh</option>
						<option value={'time'}>
							Time-Of-Use Rate of $0.20/kWh between noon and 6pm,
							and $0.08/kWh otherwise
						</option>
					</Form.Control>
				</Form.Group>
				<Form.Group controlId='mileage'>
					<Form.Label>
						About how many miles will you drive per year? (1,000
						Miles-200,000 Miles)
					</Form.Label>
					<br />
					<Form.Control
						as='input'
						size='sm'
						custom
						type='int'
						value={milesPerYear}
						onChange={(e) => setMilesPerYear(e.target.value)}
					></Form.Control>
				</Form.Group>
				{Object.keys(milesPerYearErr).map((key) => {
					return (
						<Message variant='danger' key={key}>
							{milesPerYearErr[key]}
						</Message>
					)
				})}

				<Form.Group controlId='time'>
					<Form.Label>
						From what times do you plan on charging your electric
						vehicle?
					</Form.Label>
					<br />
					Start Time:
					<TimePicker
						value={startTime}
						onChange={(time) => handleStartTimeChange(time)}
					/>
					End Time:
					<TimePicker
						value={endTime}
						onChange={(time) => handleEndTimeChange(time)}
					/>
				</Form.Group>
				{Object.keys(timeErr).map((key) => {
					return (
						<Message key={key} variant='danger'>
							{timeErr[key]}
						</Message>
					)
				})}

				<Button variant='primary' type='submit'>
					Submit
				</Button>
			</Form>
		</div>
	)
}

export default InputScreen
