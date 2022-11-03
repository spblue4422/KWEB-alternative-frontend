import type { NextPage } from 'next';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { ApplicationListItem, LectureListItem } from '../components/ListItem';
import { Layout } from '../layouts/Layout';
import { useCookies } from 'react-cookie';

const Home: NextPage = () => {
	//메인 페이지 - 본인이 신청한 강의가 보임.
	const [cookies, setCookie, removeCookie] = useCookies(['Authorization']);
	const [data, setData] = useState(new Array<any>());

	const checkLogin = () => {};

	useEffect(() => {
		axios({
			method: 'GET',
			url: 'http://localhost:3000/courses/lectures/list/my',
			withCredentials: true,
		})
			.then((res) => setData(res.data.data))
			.catch((error) => {
				if (error.response.status == 401) {
					alert('로그인이 필요한 화면입니다.');
					window.location.href = 'http://localhost:3210/login';
				} else {
					alert('알 수 없는 오류입니다. 다시 시도해주세요.');
				}
			});
	}, []);

	return (
		<Layout>
			<p className="font-extrabold text-3xl">업데이트된 강의 목록</p>
			<ul className="w-full overflow-scroll flex-1">
				{data.map((dt, idx) => (
					<ApplicationListItem
						key={`ALI_${idx}`}
						courseId={dt.course.id}
						course={dt.course.name}
						lectureId={dt.id}
						lecture={dt.title}
						date={dt.createdDate}
					></ApplicationListItem>
				))}
			</ul>
		</Layout>
	);
};

export default Home;
