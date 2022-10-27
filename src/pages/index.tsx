import type { InferGetServerSidePropsType, NextPage } from 'next';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { ApplicationListItem, LectureListItem } from '../components/ListItem';
import { Layout } from '../layouts/Layout';

const Home: NextPage = () => {
	//메인 페이지 - 본인이 신청한 강의가 보임.
	const [data, setData] = useState(new Array<any>());

	const checkLogin = () => {};

	useEffect(() => {
		axios({
			method: 'GET',
			url: 'http://localhost:3000/courses/lectures/list/my',
			withCredentials: true,
		})
			.then((res) => setData(res.data.data));
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
