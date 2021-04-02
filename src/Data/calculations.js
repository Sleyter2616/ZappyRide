export const flatHourlyRate = (
	loadRate,
	totalTimeInHours,
	usagePerHour,
	miles
) => {
	const evConsumption = 0.3
	const homeLoadProfile = loadRate * usagePerHour * totalTimeInHours
	const evLoadProfile = loadRate * miles * evConsumption
	const newBill = homeLoadProfile + evLoadProfile
	const difference = newBill - homeLoadProfile
	return difference
}

export const timeOfUseRate = (
	firstLoadRatePerHour,
	secondLoadRatePerHour,
	firstTotalTimeInHours,
	secondTotalTimeInHours,
	firstUsagePerHour,
	secondUsagePerHour
) => {
	const firstRateBill =
		firstLoadRatePerHour * firstUsagePerHour * firstTotalTimeInHours

	const secondRateBill =
		secondLoadRatePerHour * SecondUsagePerHour * SecondTotalTimeInHours

	const B1 = firstRateBill + secondLoadRatePerHour
	return B1
}
