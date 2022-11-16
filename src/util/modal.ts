export const modalOpen = async (id: string) => {
	const modal = document.getElementById(`${id}_modal`) as HTMLDivElement;
	const back = document.getElementById(`${id}_back`) as HTMLDivElement;

	modal.classList.replace('opacity-0', 'opacity-100');
	back.classList.replace('opacity-0', 'opacity-60');

	if (id != 'check') {
		modal.classList.replace('z-0', 'z-30');
		back.classList.replace('z-0', 'z-20');
	} else {
		modal.classList.replace('z-0', 'z-50');
		back.classList.replace('z-0', 'z-40');
	}

	back.classList.add('blur-sm');
};

export const modalClose = async (id: string) => {
	const modal = document.getElementById(`${id}_modal`) as HTMLDivElement;
	const back = document.getElementById(`${id}_back`) as HTMLDivElement;

	modal.classList.replace('opacity-100', 'opacity-0');
	back.classList.replace('opacity-60', 'opacity-0');

	if (id != 'check') {
		modal.classList.replace('z-30', 'z-0');
		back.classList.replace('z-20', 'z-0');
		if (id == 'lecture') {
			(
				document.getElementById('input_lec_ttl') as HTMLInputElement
			).value = '';
			(
				document.getElementById('input_lec_ctnt') as HTMLInputElement
			).value = '';
		} else if (id == 'coures') {
			(
				document.getElementById('input_crs_name') as HTMLInputElement
			).value = '';
			(
				document.getElementById('input_crs_dscrp') as HTMLInputElement
			).value = '';
		} else if (id == 'join') {
			(
				document.getElementById('input_join_id') as HTMLInputElement
			).value = '';
			(
				document.getElementById('input_join_pw') as HTMLInputElement
			).value = '';
			(
				document.getElementById('input_join_nm') as HTMLInputElement
			).value = '';
			(
				document.getElementById('input_join_un') as HTMLInputElement
			).value = '';
		}
	} else {
		modal.classList.replace('z-50', 'z-0');
		back.classList.replace('z-40', 'z-0');
	}

	back.classList.remove('blur-sm');
};
