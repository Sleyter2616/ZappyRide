import React, {useState, useEffect} from 'react'
import {flatHourlyRate, timeOfUseRate} from './calculations'

const ExcelData = () => {
	const [excelData, setExcelData] = useState([])

	const readExcel = (file) => {
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

					const dvCSV = document.getElementById('dvCSV')
					dvCSV.innerHTML = ''
					dvCSV.appendChild(table)
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
			<input
				type='file'
				accept='.xls, .xlsx, .csv'
				id='fileUpload'
				onChange={(e) => {
					const file = e.target.files[0]
					readExcel(file)
				}}
			/>
			<div id='dvCSV'></div>
		</div>
	)
}

export default ExcelData
