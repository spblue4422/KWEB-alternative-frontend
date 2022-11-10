import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { MouseEvent, MouseEventHandler, useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { VscTrash, VscChevronLeft } from 'react-icons/vsc';
import { CheckModal } from '../../../components/CheckModal';
import { Layout } from '../../../layouts/Layout';
import { ClickButton } from '../../../components/Button';
import { DateToString } from '../../../util/dateToString';

const Lecture: NextPage = () => {
	const router = useRouter();
	const { lecture } = router.query;
	const [obj, setObj] = useState(0);
	const [ldata, setLdata] = useState({
		id: 0,
		title: 'default',
		content: 'default',
		createdDate: '',
		course: {
			id: 0,
			name: 'default',
			user: {
				id: 0,
				userId: 'default',
				name: 'default',
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
			{/* <CheckModal modalId={''}></CheckModal> */}
			<Layout>
				<div className="z-10">
					<div className="flex justify-between">
						<Link href={`/courses/${ldata.course.id}`}>
							<p className="text-xl font-bold leading-8 flex items-center cursor-pointer">
								<VscChevronLeft size={24}></VscChevronLeft>
								{ldata.course.name}
							</p>
						</Link>
						{obj ? (
							<ClickButton
								id={'dellec_clk_btn'}
								class={
									'w-8 h-8 bg-crimson text-white flex justify-center items-center hover:bg-[#4a0000]'
								}
								onClick={deleteLecture}
							>
								<VscTrash size={20}></VscTrash>
							</ClickButton>
						) : (
							''
						)}
					</div>
					<div className="w-full mt-8 text-center">
						<p className="text2xl font-bold">{ldata.title}</p>
						<p className="float-right">
							{DateToString(ldata.createdDate)}
						</p>
					</div>
					<div className="mt-16 mx-6">{ldata.content}</div>
				</div>
			</Layout>
		</>
	);
};

export default Lecture;
