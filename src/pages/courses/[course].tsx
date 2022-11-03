import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { LectureListItem } from '../../components/ListItem';
import { Layout } from '../../layouts/Layout';
import { LectureForm } from '../../components/LectureForm';
import { ClickButton } from '../../components/Button';

interface crs {
	id: number;
	name: string;
	description: string;
	user: {
		id: number;
		userId: string;
		name: string;
	};
	createdDate: string;
}

const Course: NextPage = () => {
	const router = useRouter();
	const { course } = router.query;
	const [obj, setObj] = useState({ self: 0, apc: 0 });
	const [cdata, setCdata] = useState<crs>({
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
		const lectureForm = document.getElementById(
			'lecture_form',
		) as HTMLDivElement;
		const lectureBack = document.getElementById(
			'lecture_back',
		) as HTMLDivElement;

		lectureForm.classList.replace('opacity-0', 'opacity-100');
		lectureForm.classList.replace('z-0', 'z-30');
		lectureBack.classList.replace('opacity-0', 'opacity-60');
		lectureBack.classList.replace('z-0', 'z-20');
		lectureBack.classList.add('blur-sm');
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
			<LectureForm
				courseId={cdata.id}
				courseName={cdata.name}
			></LectureForm>
			<Layout>
				<div className="z-10">{cdata.name}</div>
				<p>{cdata.description}</p>
				<p>{cdata.user.name}</p>
				<div className="flex justify-between">
					<p>강의 목록</p>
					{obj.self ? (
						<ClickButton
							id={'addlec_clk_btn'}
							class={
								'w-20 bg-white text-crimson drop-shadow-md border border-crimson'
							}
						>
							강의 추가
						</ClickButton>
					) : (
						''
					)}
				</div>
				<ul className="z-10">
					{ldata.map((dt, idx) => (
						<LectureListItem
							key={`LLI_${dt.id}`}
							lectureId={dt.id}
							lecture={dt.title}
							date={dt.createdDate}
						></LectureListItem>
					))}
				</ul>
			</Layout>
		</>
	);
};

export default Course;
