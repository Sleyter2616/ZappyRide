export const flatHourlyRate = (loadRate, loadProfile, miles) => {
	const evConsumption = 0.3
	const homeLoadPrice = loadRate * loadProfile
	const evLoadPrice = loadRate * miles * evConsumption
	const newBill = homeLoadPrice + evLoadPrice
	const difference = newBill - homeLoadPrice
	return difference
}

export const timeOfUseRate = (
	noonToSixLoadRatePerHour,
	normalLoadRatePerHour
) => {}
