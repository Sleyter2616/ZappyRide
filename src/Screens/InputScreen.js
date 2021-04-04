import React, {useState, useEffect} from 'react'
import {Form, Button} from 'react-bootstrap'
import TimePicker from 'react-bootstrap-time-picker'
import Message from '../components/Message'
import {flatHourlyRate, timeOfUseRate} from '../Data/calculations'

const InputScreen = () => {
	//All neccesary UI states from user inputs
	const [typeRate, setTypeRate] = useState('flat')
	const [milesPerYear, setMilesPerYear] = useState(1000)
	const [time, setTime] = useState('morning')

	// Error handling for the form validation
	const [milesPerYearErr, setMilesPerYearErr] = useState({})

	const onSubmit = (e) => {
		e.preventDefault()
		const isValid = formValidation()
		if (isValid) {
			//Send data to calculate
			//Push to results page
		}
	}
	const formValidation = () => {
		const milesPerYearErr = {}
		let isValid = true

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

		return isValid
	}

	// Getting data from CSV file
	const readExcel = () => {
		//Uploading csv file and testing to make sure it has proper characters
		const fileUpload = document.getElementById('fileUpload')
		const regex = /^([a-zA-Z0-9\s_\\.\-:])+(.csv|.txt)$/
		if (regex.test(fileUpload.value.toLowerCase())) {
			if (typeof FileReader != 'undefined') {
				const reader = new FileReader()

				reader.onload = function (e) {
					//create Table and Rows
					const table = document.createElement('table')
					const rows = e.target.result.split('\n')
					console.log(rows.length)
					//Looping over every row after the first (to skip the names)
					//to insert the rows

					//SKIP LAST NEW LINE, AND SKIP FIRST LINE
					//
					let loadProfile = 0
					let noonToSixProfile = 0
					let hourTime = 1
					for (let i = 1; i < rows.length - 1; i++) {
						const row = table.insertRow(-1)
						const cells = rows[i].split(',')
						//starting on the second item and looping over
						//Each second iteml

						for (let j = 1; j < cells.length; j += row.length) {
							const cell = row.insertCell(-1)
							if (hourTime >= 12 && hourTime < 18) {
								noonToSixProfile += parseFloat(cells[j])
							}
							cell.innerHTML = cells[j]

							loadProfile += parseFloat(cells[j])
							hourTime++
							if (hourTime == 24) {
								hourTime = 0
							}
						}
					}
					const loadRate = 0.15,
						miles = 5000

					const flatDifference = flatHourlyRate(
						loadRate,
						loadProfile,
						miles
					)
					console.log('flat difference', flatDifference)
					const noonTOURate = 0.08,
						normalTOURate = 0.2,
						time = 'afternoon'
					const timeOfUseDifference = timeOfUseRate(
						noonTOURate,
						normalTOURate,
						loadProfile,
						noonToSixProfile,
						miles,
						time
					)
					console.log('time of use difference', timeOfUseDifference)

					// const dvCSV = document.getElementById('dvCSV')
					// dvCSV.innerHTML = ''
					// dvCSV.appendChild(table)
				}
				reader.readAsText(fileUpload.files[0])
			} else {
				alert('This browser does not support HTML5.')
			}
		} else {
			alert('Please upload a valid CSV file.')
		}
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

				<Form.Group controlId='timeSelect'>
					<Form.Label>
						What time do you plan on charging your Electric Vehicle?
					</Form.Label>
					<Form.Control
						as='select'
						value={time}
						onChange={(e) => setTime(e.target.value)}
					>
						<option value='midnight'>12:00AM - 6:00AM</option>
						<option value='morning'>6:00AM - 12:00PM</option>
						<option value='afternoon'> 12:00PM - 6:00PM</option>
						<option value='evening'>6:00PM - 12:00AM</option>
					</Form.Control>
				</Form.Group>
				<Form.Group>
					<Form.File
						label='Please Upload CSV file with data'
						accept='.csv'
						id='fileUpload'
						onChange={() => {
							readExcel()
						}}
					/>
				</Form.Group>

				<Message variant='info'>
					If needed download CSV file with data below
				</Message>
				<a
					target='_blank'
					href='https://openei.org/datasets/files/961/pub/EPLUS_TMY2_RESIDENTIAL_BASE/USA_NY_Buffalo.725280_TMY2.csv'
				>
					BUFFALO NY CSV FILE
				</a>
				<br />
				<Button variant='primary' type='submit'>
					Submit
				</Button>
			</Form>
		</div>
	)
}

export default InputScreen
