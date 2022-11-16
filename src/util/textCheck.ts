//공백 여부만 체크
export const spaceCheck = async (txtArr: Array<string>) => {
	for (let i in txtArr) {
		console.log(txtArr[i]);
		if (txtArr[i].replaceAll(' ', '') == '') {
			return false;
		}
	}
	return true;
};
