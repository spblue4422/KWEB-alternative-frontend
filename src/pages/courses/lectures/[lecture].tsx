import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { MouseEvent, MouseEventHandler, useEffect, useState } from 'react';
import axios from 'axios';
import { Layout } from '../../../layouts/Layout';
import { LectureForm } from '../../../components/LectureForm';
import { ClickButton } from '../../../components/Button';
import { DateToString } from '../../../util/dateToString';

const Lecture: NextPage = () => {
	const router = useRouter();
	const { lecture } = router.query;
	const [obj, setObj] = useState(0);
	const [ldata, setLdata] = useState({
		id: 0,
		title: '',
		content: '',
		createdDate: '',
		course: {
			id: 0,
			name: '',
			user: {
				id: 0,
				userId: '',
				name: '',
			},
		},
	});

	const deleteLecture = async (e: MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();

		axios({
			method: 'DELETE',
			url: `http://localhost:3000/courses/lectures/remove/${lecture}`,
			withCredentials: true,
		})
			.then((res) => {
				if (res.data.code == 'SUCCESS') {
					alert(res.data.msg);
					window.location.href = `http://localhost:3000/courses/${ldata.course.id}`;
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
	};

	// const lectureModalOpen = async () => {
	// 	const lectureForm = document.getElementById(
	// 		'lecture_form',
	// 	) as HTMLDivElement;
	// 	const lectureBack = document.getElementById(
	// 		'lecture_back',
	// 	) as HTMLDivElement;

	// 	const inputTitle = document.getElementById(
	// 		'input_lec_ttl',
	// 	) as HTMLInputElement;
	// 	const inputCtnt = document.getElementById(
	// 		'input_lec_ctnt',
	// 	) as HTMLInputElement;

	// 	inputTitle.value = ldata.title;
	// 	inputCtnt.value = ldata.content;

	// 	lectureForm.classList.replace('opacity-0', 'opacity-100');
	// 	lectureForm.classList.replace('z-0', 'z-30');
	// 	lectureBack.classList.replace('opacity-0', 'opacity-60');
	// 	lectureBack.classList.replace('z-0', 'z-20');
	// 	lectureBack.classList.add('blur-sm');
	// };

	useEffect(() => {
		if (!router.isReady) return;

		axios({
			method: 'GET',
			url: `http://localhost:3000/courses/lectures/${lecture}`,
			withCredentials: true,
		})
			.then((res) => {
				if (res.data.code == 'SUCCESS') {
					setLdata(res.data.data);
					setObj(res.data.self);
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
	}, [lecture]);

	return (
		<>
			{/* <LectureForm
				courseId={ldata.course.id}
				courseName={ldata.course.name}
			></LectureForm> */}
			<Layout>
				<div className="flex justify-between">
					<p>{ldata.course.name}</p>
					{obj ? (
						<ClickButton
							id={'dellec_clk_btn'}
							class={'w-20 bg-crimson text-white'}
							onClick={deleteLecture}
						>강의 삭제</ClickButton>
					) : (
						<div></div>
					)}
				</div>
				<div className="flex justify-between">
					<p>{ldata.title}</p>
					<p>{DateToString(ldata.createdDate)}</p>
				</div>
				<div>{ldata.content}</div>
			</Layout>
		</>
	);
};

export default Lecture;
