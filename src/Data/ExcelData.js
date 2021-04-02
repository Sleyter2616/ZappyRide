import React, {useState, useEffect} from 'react'
import * as XLSX from 'xlsx'

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
					let num = 0
					for (let i = 1; i < rows.length - 1; i++) {
						const row = table.insertRow(-1)
						const cells = rows[i].split(',')
						//starting on the second item and looping over
						//Each second iteml

						for (let j = 1; j < cells.length; j += row.length) {
							const cell = row.insertCell(-1)

							cell.innerHTML = cells[j]
							num += parseFloat(cells[j])
						}
					}
					console.log(num / rows.length)
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
