import { NextPage } from 'next';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Layout } from '../layouts/Layout';
import { CourseListItem } from '../components/ListItem';
import { DateToString } from '../util/dateToString';
import { ClickButton } from '../components/Button';
import { CourseForm } from '../components/CourseForm';

const MyPage: NextPage = () => {
	const [udata, setUdata] = useState({
		id: 0,
		name: '',
		userId: '',
		uniqueNum: '',
		status: 'student',
		createdDate: '',
	});
	const [cdata, setCdata] = useState(new Array<any>());

	const courseModalOpen = async () => {
		const courseForm = document.getElementById(
			'course_form',
		) as HTMLDivElement;
		const courseBack = document.getElementById(
			'course_back',
		) as HTMLDivElement;

		courseForm.classList.replace('opacity-0', 'opacity-100');
		courseForm.classList.replace('z-0', 'z-30');
		courseBack.classList.replace('opacity-0', 'opacity-60');
		courseBack.classList.replace('z-0', 'z-20');
		courseBack.classList.add('blur-sm');
	};

	useEffect(() => {
		axios({
			method: 'GET',
			url: 'http://localhost:3000/users/my',
			withCredentials: true,
		})
			.then((res) => setUdata(res.data.data))
			.catch((error) => {
				if (error.response.status == 401) {
					alert('로그인이 필요한 화면입니다.');
					window.location.href = 'http://localhost:3210/login';
				} else {
					alert('서버 에러입니다. 다시 시도해주세요.');
				}
			});

		axios({
			method: 'GET',
			url: 'http://localhost:3000/courses/list/my',
			withCredentials: true,
		})
			.then((res) => setCdata(res.data.data))
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
			<CourseForm></CourseForm>
			<Layout>
				<h1>내 정보</h1>
				<div className="flex justify-between">
					<p>이름</p>
					<p>{udata.name}</p>
				</div>
				<div className="flex justify-between">
					<p>학번/교번</p>
					<p>{udata.uniqueNum}</p>
				</div>
				<div className="flex justify-between">
					<p>아이디</p>
					<p>{udata.userId}</p>
				</div>
				<div className="flex justify-between">
					<p>신분</p>
					<p>{udata.status}</p>
				</div>
				<div className="flex justify-between">
					<p>가입일자</p>
					<p>{DateToString(udata.createdDate).slice(0, 10)}</p>
				</div>
				<div className="flex justify-between">
					<p>
						{udata.status == 'student' ? '신청 강의' : '개설 강의'}
					</p>
					{udata.status == 'student' ? (
						''
					) : (
						<ClickButton
							id={'addcrs_clk_btn'}
							class={
								'w-20 bg-white text-crimson drop-shadow-md border border-crimson'
							}
							onClick={courseModalOpen}
						>
							코스 추가
						</ClickButton>
					)}
				</div>
				<ul className="w-full overflow-scroll flex-1 z-10">
					{cdata.map((dt, idx) => (
						<CourseListItem
							key={`CLI_${idx}`}
							courseId={dt.id}
							course={dt.name}
							professorId={dt.user.userId}
							professor={dt.user.name}
						></CourseListItem>
					))}
				</ul>
			</Layout>
		</>
	);
};

export default MyPage;
