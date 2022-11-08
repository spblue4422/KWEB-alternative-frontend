import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { VscTrash } from 'react-icons/vsc';
import { FaPlus } from 'react-icons/fa';
import { RiGroupLine } from 'react-icons/ri';
import { LectureListItem } from '../../components/ListItem';
import { Layout } from '../../layouts/Layout';
import { LectureModal } from '../../components/LectureModal';
import { ClickButton } from '../../components/Button';
import { MemberModal } from '../../components/MemberModal';

const Course: NextPage = () => {
	const router = useRouter();
	const { course } = router.query;
	const [obj, setObj] = useState({ self: 0, apc: 0 });
	const [cdata, setCdata] = useState({
		id: 0,
		name: '',
		description: '',
		user: {
			id: 0,
			userId: '',
			name: '',
		},
		createdDate: '',
	});
	const [ldata, setLdata] = useState(new Array<any>());

	const lectureModalOpen = async () => {
		const lectureModal = document.getElementById(
			'lecture_modal',
		) as HTMLDivElement;
		const lectureBack = document.getElementById(
			'lecture_back',
		) as HTMLDivElement;

		lectureModal.classList.replace('opacity-0', 'opacity-100');
		lectureModal.classList.replace('z-0', 'z-30');
		lectureBack.classList.replace('opacity-0', 'opacity-60');
		lectureBack.classList.replace('z-0', 'z-20');
		lectureBack.classList.add('blur-sm');
	};

	const memberModalOpen = async () => {
		const memberModal = document.getElementById(
			'member_modal',
		) as HTMLDivElement;
		const memberBack = document.getElementById(
			'member_back',
		) as HTMLDivElement;

		memberModal.classList.replace('opacity-0', 'opacity-100');
		memberModal.classList.replace('z-0', 'z-30');
		memberBack.classList.replace('opacity-0', 'opacity-60');
		memberBack.classList.replace('z-0', 'z-20');
		memberBack.classList.add('blur-sm');
	};
	useEffect(() => {
		if (!router.isReady) return;
		axios({
			method: 'GET',
			url: `http://localhost:3000/courses/${course}`,
			withCredentials: true,
		})
			.then((res) => {
				if (res.data.code == 'SUCCESS') {
					setCdata(res.data.data);
					setObj({
						self: res.data.self,
						apc: res.data.apc,
					});
				} else {
					alert(res.data.msg);
				}
			})
			.catch((error) => {
				if (error.response.status == 401) {
					alert('로그인이 필요한 화면입니다.');
					window.location.href = 'http://localhost:3210/login';
				} else {
					alert('알 수 없는 오류입니다. 다시 시도해주세요.1');
				}
			});
		axios({
			method: 'GET',
			url: `http://localhost:3000/courses/lectures/list?cid=${course}`,
			withCredentials: true,
		})
			.then((res) => {
				if (res.data.code == 'SUCCESS') {
					setLdata(res.data.data);
				} else {
					alert(res.data.msg);
				}
			})
			.catch((error) => {
				if (error.response.status == 401) {
					alert('로그인이 필요한 화면입니다.');
					window.location.href = 'http://localhost:3210/login';
				} else {
					alert('알 수 없는 오류입니다. 다시 시도해주세요.2');
				}
			});
	}, [course]);

	return (
		<>
			<LectureModal
				courseId={cdata.id}
				courseName={cdata.name}
			></LectureModal>
			{/* 처음에 cdata 값이 제대로 들어가있지 않은 상태에서 membermodal로 값이 전달됨. 흠. */}
			<MemberModal courseId={cdata.id}></MemberModal>
			<Layout>
				<div className="z-10">
					<div className="w-full flex justify-between">
						<p className="text-3xl font-extrabold leading-relaxed">
							{cdata.name}
							<span className="text-base font-normal">
								{' '}
								{cdata.user.name}
							</span>
						</p>
						{obj.self ? (
							<div className="flex">
								<ClickButton
									id={'memcrs_clk_btn'}
									class={
										'w-12 border flex justify-center items-center text-crimson border-crimson hover:bg-gray-100 mr-2'
									}
									onClick={memberModalOpen}
								>
									<RiGroupLine size={24}></RiGroupLine>
								</ClickButton>
								<ClickButton
									id={'addlec_clk_btn'}
									class={
										'w-12 bg-crimson text-white flex justify-center items-center hover:bg-[#4a0000] drop-shadow-md'
									}
									onClick={lectureModalOpen}
								>
									<VscTrash size={24}></VscTrash>
								</ClickButton>
							</div>
						) : (
							''
						)}
					</div>
					<div className="w-full mt-10">
						<p className="text-lg font-bold">코스 개요</p>
						<p>{cdata.description}</p>
					</div>
					<div className="w-full mt-10">
						<p className="text-lg font-bold">강의 목록</p>
						<ul className="w-full max-h-[120px] overflow-scroll mt-2">
							{ldata.map((dt, idx) => (
								<LectureListItem
									key={`LLI_${dt.id}`}
									lectureId={dt.id}
									lecture={dt.title}
									date={dt.createdDate}
								></LectureListItem>
							))}
						</ul>
						{obj.self ? (
							<ClickButton
								id={'addlec_clk_btn'}
								class={
									'w-12 float-right mt-2 bg-crimson text-white flex justify-center items-center hover:bg-[#4a0000] drop-shadow-md'
								}
								onClick={lectureModalOpen}
							>
								<FaPlus size={24}></FaPlus>
							</ClickButton>
						) : (
							''
						)}
					</div>
				</div>
			</Layout>
		</>
	);
};

export default Course;
