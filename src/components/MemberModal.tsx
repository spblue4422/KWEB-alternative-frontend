import { useEffect, useState } from 'react';
import axios from 'axios';
import { VscChromeClose } from 'react-icons/vsc';

export const MemberModal: React.FC<number> = (courseId: number) => {
	const [mdata, setMdata] = useState(new Array<any>());

	const memberModalClose = async () => {
		const memberForm = document.getElementById(
			'member_modal',
		) as HTMLDivElement;
		const memberBack = document.getElementById(
			'member_back',
		) as HTMLDivElement;

		memberForm.classList.replace('opacity-100', 'opacity-0');
		memberForm.classList.replace('z-30', 'z-0');
		memberBack.classList.replace('opacity-60', 'opacity-0');
		memberBack.classList.replace('z-20', 'z-0');
		memberBack.classList.remove('blur-sm');
	};

	useEffect(() => {
		axios({
			method: 'GET',
			url: `http://localhost:3000/courses/users/list?=${courseId}`,
			withCredentials: true,
		})
			.then((res) => {
				if (res.data.code == 'SUCCESS') {
					setMdata(res.data.data);
				} else {
					alert(res.data.msg);
				}
			})
			.catch((error) => {
				if (error.response.status == 401) {
					alert('로그인이 필요한 화면입니다.');
					window.location.href = 'http://localhost:3210/login';
				} else {
					alert('서버 에러입니다. 다시 시도해주세요.');
				}
			});
	}, []);

	return (
		<>
			<div
				id="member_back"
				className="absolute w-full h-full bg-[#666666] z-0 opacity-0"
			></div>
			<div
				id="member_modal"
				className="w-[480px] h-[600px] absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] z-0 opacity-0"
			>
				<VscChromeClose
					id="icon_x"
					size={28}
					className="absolute top-6 right-6 cursor-pointer"
					onClick={memberModalClose}
				></VscChromeClose>
				<div className="w-[320px] flex flex-col">
					<ul className="w-full">{}</ul>
				</div>
			</div>
		</>
	);
};
