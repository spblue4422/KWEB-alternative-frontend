import { NextPage } from 'next';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { FaPlus } from 'react-icons/fa';
import { Layout } from '../layouts/Layout';
import { CourseListItem } from '../components/ListItem';
import { DateToString } from '../util/dateToString';
import { ClickButton } from '../components/Button';
import { CourseModal } from '../components/CourseModal';
import { modalOpen } from '../util/modal';

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

	useEffect(() => {
		//드러운 axios 코드 정리 필요할듯
		axios({
			method: 'GET',
			url: 'http://localhost:3000/users/my',
			withCredentials: true,
		})
			.then((res) => {
				setUdata(res.data.data);
				axios({
					method: 'GET',
					url: 'http://localhost:3000/courses/list/my',
					withCredentials: true,
				})
					.then((res) => setCdata(res.data.data))
					.catch((error) => {
						if (error.response.status == 401) {
							alert('로그인이 필요한 화면입니다.');
							window.location.href =
								'http://localhost:3210/login';
						} else {
							alert('서버 에러입니다. 다시 시도해주세요.');
						}
					});
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
			<CourseModal></CourseModal>
			<Layout>
				<div className="z-10">
					<p className="text-3xl font-extrabold leading-relaxed">
						내 정보
					</p>
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
						<p>가입일</p>
						<p>{DateToString(udata.createdDate).slice(0, 10)}</p>
					</div>
					<div className="mt-10">
						<p className="text-lg font-bold">
							{udata.status == 'student'
								? '신청 코스 목록'
								: '개설 코스 목록'}
						</p>
						<ul className="w-full max-h-[120px] overflow-hidden hover:overflow-y-scroll mt-2">
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
						{udata.status == 'student' ? (
							''
						) : (
							<ClickButton
								id={'addcrs_clk_btn'}
								class={
									'w-12 float-right mt-2 bg-crimson text-white flex justify-center items-center hover:bg-[#4a0000] drop-shadow-md'
								}
								onClick={(e) => {
									modalOpen('course');
								}}
							>
								<FaPlus size={24}></FaPlus>
							</ClickButton>
						)}
					</div>
				</div>
			</Layout>
		</>
	);
};

export default MyPage;
