import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { MouseEvent, useEffect, useState } from 'react';
import axios from 'axios';
import { useRecoilState } from 'recoil';
import { VscTrash } from 'react-icons/vsc';
import { FaPlus } from 'react-icons/fa';
import { RiGroupLine } from 'react-icons/ri';
import { LectureListItem } from '../../components/ListItem';
import { Layout } from '../../layouts/Layout';
import { LectureModal } from '../../components/LectureModal';
import { ClickButton } from '../../components/Button';
import { MemberModal } from '../../components/MemberModal';
import { CheckModal } from '../../components/CheckModal';
import { modalOpen, modalClose } from '../../util/modal';

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
	const [order, setOrder] = useState(0);

	const deleteCourse = async (e: MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		modalClose('check');

		await axios({
			method: 'DELETE',
			url: `http://localhost:3000/courses/remove/${course}`,
			withCredentials: true,
		})
			.then((res) => {
				if (res.data.code == 'SUCCESS') {
					alert(res.data.msg);
					window.location.href = `http://localhost:3000/myPage`;
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

	const adjustApplication = async (e: MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		modalClose('check');

		if (!course) {
			alert('알 수 없는 오류입니다. 다시 시도해주세요.');
			return;
		}
		if (obj.apc) {
			await axios({
				method: 'DELETE',
				url: `http://localhost:3000/applications/delete/${course}`,
				withCredentials: true,
			})
				.then((res) => {
					if (res.data.code == 'SUCCESS') {
						alert('수강 신청이 취소되었습니다.');
						window.location.reload();
					} else {
						alert(res.data.msg);
					}
				})
				.catch((error) => {
					if (error.response.status == 401) {
						alert('로그인이 필요한 화면입니다.');
						window.location.href = 'http://localhost:3210/login';
					} else {
						alert('알 수 없는 오류입니다. 다시 시도해주세요.');
					}
				});
		} else {
			await axios({
				method: 'POST',
				url: `http://localhost:3000/applications/add`,
				data: {
					cid: course,
				},
				headers: {
					'Content-Type': 'application/json',
				},
				withCredentials: true,
			})
				.then((res) => {
					if (res.data.code == 'SUCCESS') {
						alert('코스가 신청되었습니다.');
						window.location.reload();
					} else {
						alert(res.data.msg);
					}
				})
				.catch((error) => {
					if (error.response.status == 401) {
						alert('로그인이 필요한 화면입니다.');
						window.location.href = 'http://localhost:3210/login';
					} else {
						alert(error);
					}
				});
		}
	};

	useEffect(() => {
		if (!router.isReady) return;
		//드러운 axios 코드 정리 필요할듯
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
								window.location.href =
									'http://localhost:3210/login';
							} else {
								alert(
									'알 수 없는 오류입니다. 다시 시도해주세요.',
								);
							}
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
					alert('알 수 없는 오류입니다. 다시 시도해주세요.');
				}
			});
	}, [course]);

	const dt = [
		{
			text: (
				<>
					코스를
					<br />
					삭제하시겠습니까?
				</>
			),
			func: deleteCourse,
		},
		{
			text: (
				<>
					수강을
					<br />
					취소하시겠습니까?
				</>
			),
			func: adjustApplication,
		},
		{
			text: (
				<>
					수강을
					<br />
					신청하시겠습니까?
				</>
			),
			func: adjustApplication,
		},
	];

	return (
		<>
			<LectureModal
				courseId={cdata.id}
				courseName={cdata.name}
			></LectureModal>
			<MemberModal
				courseId={cdata.id}
				self={obj.self ? true : false}
			></MemberModal>
			<CheckModal confirmFunc={dt[order].func}>
				{dt[order].text}
			</CheckModal>
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
										'w-12 mr-2 border flex justify-center items-center text-crimson border-crimson hover:bg-gray-100'
									}
									onClick={(e) => {
										modalOpen('member');
									}}
								>
									<RiGroupLine size={24}></RiGroupLine>
								</ClickButton>
								<ClickButton
									id={'delcrs_clk_btn'}
									class={
										'w-12 bg-crimson text-white flex justify-center items-center hover:bg-[#4a0000]'
									}
									onClick={(e) => {
										setOrder(0);
										modalOpen('check');
									}}
								>
									<VscTrash size={24}></VscTrash>
								</ClickButton>
							</div>
						) : obj.apc ? (
							<ClickButton
								id={'delapc_clk_btn'}
								class={
									'w-12 bg-crimson text-white flex justify-center items-center hover:bg-[#4a0000]'
								}
								onClick={(e) => {
									setOrder(1);
									modalOpen('check');
								}}
							>
								취소
							</ClickButton>
						) : (
							<ClickButton
								id={'addapc_clk_btn'}
								class={
									'w-12 mr-2 border flex justify-center items-center text-crimson border-crimson hover:bg-gray-100'
								}
								onClick={(e) => {
									setOrder(2);
									modalOpen('check');
								}}
							>
								신청
							</ClickButton>
						)}
					</div>
					<div className="w-full mt-10">
						<p className="text-lg font-bold">코스 개요</p>
						<p>{cdata.description}</p>
					</div>
					<div className="w-full mt-10">
						<p className="text-lg font-bold">강의 목록</p>
						<ul className="w-full max-h-[300px] overflow-hidden hover:overflow-y-scroll mt-2">
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
								onClick={(e) => {
									modalOpen('lecture');
								}}
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
