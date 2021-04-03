export const flatHourlyRate = (loadRate, loadProfile, miles) => {
	const evConsumption = 0.3
	const homeLoadPrice = loadRate * loadProfile
	const evLoadPrice = loadRate * miles * evConsumption
	const newBill = homeLoadPrice + evLoadPrice
	const difference = newBill - homeLoadPrice
	return difference
}

export const timeOfUseRate = (
	noonToSixLoadRate,
	normalLoadRate,
	totalLoadProfile,
	noonToSixProfile,
	miles,
	time
) => {
	const evConsumption = 0.3
	const normalLoadProfile = totalLoadProfile - noonToSixProfile
	const homeLoadPrice =
		normalLoadProfile * normalLoadRate +
		noonToSixProfile * noonToSixLoadRate
	let evLoadPrice = 0
	if (time === 'afternoon') {
		evLoadPrice = noonToSixLoadRate * miles * evConsumption
	} else {
		evLoadPrice = normalLoadRate * miles * evConsumption
	}
	const newBill = homeLoadPrice + evLoadPrice
	const difference = newBill - homeLoadPrice
	return difference
}
