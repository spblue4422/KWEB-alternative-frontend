import { NextPage } from 'next';
import { LectureListItem } from '../../components/ListItem';
import { Layout } from '../../layouts/Layout';

const Course: NextPage = () => {
	const cData: any[] = [];
	const lData: any[] = [];
	return (
		<Layout>
			<div>{/* 코스명 + 코스 정보 */}</div>
			<ul>
				{lData.map((dt, idx) => (
					<LectureListItem
						key={`LLI_${dt.id}`}
						lectureId={dt.id}
						lecture={dt.title}
						date={dt.createdDate}
					></LectureListItem>
				))}
			</ul>
		</Layout>
	);
};

export default Course;
