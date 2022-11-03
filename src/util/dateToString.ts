export const DateToString = (date: string) => {
	const monthRcd: Record<string, string> = {
		Jan: '01',
		Feb: '02',
		Mar: '03',
		Apr: '04',
		May: '05',
		Jun: '06',
		Jul: '07',
		Aug: '08',
		Sep: '09',
		Oct: '10',
		Nov: '11',
		Dec: '12',
	};

	const nDate = new Date(date);
	const dStr = nDate.toDateString().split(' ');
	const dRet = dStr[3] + '-' + monthRcd[dStr[1]] + '-' + dStr[2] + ' ';
	const tRet = nDate.toTimeString().split(' ')[0];
	return dRet + tRet;
};
