export const flatHourlyRate = (
	loadRatePerHour,
	totalTimeInHours,
	usagePerHour
) => {
	const totalYearBill = loadRatePerHour * usagePerHour * totalTimeInHours
	return totalYearBill
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
	const totalYearBill = firstRateBill + secondLoadRatePerHour
	return totalYearBill
}
