import React, {useState, useEffect} from 'react'
import * as XLSX from 'xlsx'

const ExcelData = () => {
	const [excelData, setExcelData] = useState([])

	const readExcel = (file) => {
		const fileUpload = document.getElementById('fileUpload')
		const regex = /^([a-zA-Z0-9\s_\\.\-:])+(.csv|.txt)$/
		if (regex.test(fileUpload.value.toLowerCase())) {
			if (typeof FileReader != 'undefined') {
				const reader = new FileReader()
				reader.onload = function (e) {
					const table = document.createElement('table')
					const rows = e.target.result.split('\n')
					for (let i = 0; i < rows.length; i++) {
						const row = table.insertRow(-1)

						const cells = rows[i].split(',')
						for (let j = 0; j < cells.length; j++) {
							const cell = row.insertCell(-1)
							cell.innerHTML = cells[j]
						}
					}
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
