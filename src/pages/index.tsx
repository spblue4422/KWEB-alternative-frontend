import type { InferGetServerSidePropsType, NextPage } from 'next';
import { useEffect } from 'react';
import { ApplicationListItem, LectureListItem } from '../components/ListItem';
import { ResultType } from '../interface/interface';
import { Layout } from '../layouts/Layout';
import { getCookie } from '../util/getCookie';

const Home: NextPage = () => {
	//메인 페이지 - 본인이 신청한 강의가 보임.
	let res: ResultType = { code: '', msg: '', data: [] };

	const checkLogin = () => {};
	const getData = async (): Promise<void> => {
		// const cookie = getCookie();
		res = await (
			await fetch('http://localhost:3000/courses/lectures/list/my')
		).json();
	};

	useEffect(() => {
		getData();
	});

	return (
		<Layout>
			<p className="font-extrabold text-3xl">업데이트된 강의 목록</p>
			<dl className="w-full overflow-scroll flex-1">
				{res.data.map((dt, idx) => (
					<ApplicationListItem
						key={`ALI_${idx}`}
						courseId={dt.course.id}
						course={dt.course.name}
						lectureId={dt.id}
						lecture={dt.title}
						date={dt.createdDate}
					></ApplicationListItem>
				))}
			</dl>
		</Layout>
	);
};

export default Home;
