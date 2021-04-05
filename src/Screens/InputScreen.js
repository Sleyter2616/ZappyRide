import React, {useState, useEffect} from 'react'
import {Form, Button} from 'react-bootstrap'
import Message from '../components/Message'
import {flatHourlyRate, timeOfUseRate} from '../Data/calculations'
import Result from '../components/Result'

const InputScreen = ({history}) => {
	//All neccesary UI states from user inputs
	const [typeRate, setTypeRate] = useState('flat')
	const [milesPerYear, setMilesPerYear] = useState(5000)
	const [time, setTime] = useState('morning')
	const [flatLoadRate, setFlatLoadRate] = useState(0.15)
	const [afternoonRate, setAfternoonRate] = useState(0.2)
	const [otherTOURate, setOtherTOURate] = useState(0.08)
	const [loadProfile, setLoadProfile] = useState(0)
	const [afternoonProfile, setAfternoonProfile] = useState(0)
	const [timeOfUseDifference, setTimeOfUseDifference] = useState(0)
	const [flatDifference, setFlatDifference] = useState(0)
	const [resultObject, setResultObject] = useState({})

	// Error handling for the form validation
	const [milesPerYearErr, setMilesPerYearErr] = useState({})
	const [loadProfileErr, setLoadProfileErr] = useState({})

	const onSubmit = (e) => {
		e.preventDefault()
		const isValid = formValidation()

		if (isValid) {
			//Send data to calculate
			const flatDiff = flatHourlyRate(
				flatLoadRate,
				loadProfile,
				milesPerYear
			)

			const touDiff = timeOfUseRate(
				afternoonRate,
				otherTOURate,
				loadProfile,
				afternoonProfile,
				milesPerYear,
				time
			)

			setFlatDifference(flatDiff)
			setTimeOfUseDifference(touDiff)

			const result = {}
			//Push to results page
			if (flatDiff < touDiff) {
				if (typeRate === 'flat') {
					result.choice = 'flat'
					result.text = `You should keep the flat rate. You will be paying an  extra $${flatDiff} (Flat Rate) vs $${touDiff} (Time Rate) a year. Total savings by keeping the Flat rate over the time rate is ${
						touDiff - flatDiff
					} `
				}
				if (typeRate === 'time') {
					result.choice = 'time'
					result.text = `You should switch to a flat rate. You will be paying an extra $${flatDiff} (Flat Rate) vs $${touDiff} (Time Rate) a year. Total savings by switching to the flat rate over the time rate is ${
						touDiff - flatDiff
					}`
				}
			}
			if (touDiff < flatDiff) {
				if (typeRate === 'flat') {
					result.choice = 'flat'
					result.text = `You should switch to the Time rate. You will be paying an extra $${flatDiff} (Flat Rate) vs $${touDiff} (Time Rate) a year. Total savings switching to the time rate over the flat rate is ${
						flatDiff - touDiff
					} `
				}
				if (typeRate === 'time') {
					result.choice = 'time'
					result.text = `You should keep the time rate. You will be paying an extra $${flatDiff} (Flat Rate) vs $${touDiff} (Time Rate) a year. Total savings by keeping the time rate over the flat rate is ${
						flatDiff - touDiff
					} `
				}
			}
			if (touDiff === flatDiff) {
				result.text = ` Both rates work the same! You will be paying ${flatDiff} a year for either Rate. `
				typeRate === 'time'
					? (result.choice = 'time')
					: (result.choice = 'flat')
			}
			setResultObject(result)
			console.log(resultObject)
		}
	}
	const formValidation = () => {
		const milesPerYearErr = {}
		const loadProfileErr = {}
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
		if (loadProfile === 0) {
			loadProfileErr.notSet =
				'Please upload a proper CSV file with an loadProfile on the Second column (data Starting Row 2) '
			isValid = false
		}

		setMilesPerYearErr(milesPerYearErr)
		setLoadProfileErr(loadProfileErr)

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
					//Temporary values for setting other vals
					let currProfile = 0
					let currAfternoonProfile = 0
					let hourTime = 1
					for (let i = 1; i < rows.length - 1; i++) {
						const row = table.insertRow(-1)
						const cells = rows[i].split(',')
						//starting on the second item and looping over
						//Each second iteml

						for (let j = 1; j < cells.length; j += row.length) {
							const cell = row.insertCell(-1)
							if (hourTime >= 12 && hourTime < 18) {
								currAfternoonProfile += parseFloat(cells[j])
							}
							cell.innerHTML = cells[j]

							currProfile += parseFloat(cells[j])
							hourTime++
							if (hourTime === 24) {
								hourTime = 0
							}
						}
					}
					setLoadProfile(currProfile)
					setAfternoonProfile(currAfternoonProfile)
				}
				reader.readAsText(fileUpload.files[0])
			} else {
				alert('This browser does not support HTML5.')
			}
		} else {
			alert('Please upload a valid CSV file.')
		}
	}
	const labelStyle = {
		color: 'black',
	}
	return (
		<div>
			{resultObject.choice ? (
				<Result text={resultObject.text} choice={resultObject.choice} />
			) : null}
			<Form className='py-4' onSubmit={onSubmit}>
				<Form.Group controlId='typeOfRate'>
					<Form.Label style={labelStyle}>
						Which rate are you currently on?
					</Form.Label>
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
					<Form.Label style={labelStyle}>
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
					<Form.Label style={labelStyle}>
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
						style={labelStyle}
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
					rel='noreferrer'
					href='https://openei.org/datasets/files/961/pub/EPLUS_TMY2_RESIDENTIAL_BASE/USA_NY_Buffalo.725280_TMY2.csv'
				>
					BUFFALO NY CSV FILE
				</a>
				<br />
				{Object.keys(loadProfileErr).map((key) => {
					return (
						<Message variant='danger' key={key}>
							{loadProfileErr[key]}
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
