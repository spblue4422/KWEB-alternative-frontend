import { NextPage } from 'next';
import { useEffect } from 'react';
import { SubmitButton } from '../components/Button';
import { TextInput } from '../components/Input';
import { CourseListItem } from '../components/ListItem';
import { ResultType } from '../interface/interface';
import { Layout } from '../layouts/Layout';

const Search: NextPage = () => {
	let res: ResultType = { code: '', msg: '', data: [] };

	const getAllCourses = async () => {
		res = await (
			await fetch('http://localhost:3000/courses/list/search')
		).json();
	};

	const searchAllCoursesByInput = async () => {
		res = await (
			await fetch('http://localhost:3000/courses/list/search')
		).json();
	};

	useEffect(() => {
		getAllCourses();
	}, []);

	return (
		<Layout>
			<form
				onSubmit={searchAllCoursesByInput}
				className="w-full flex justify-between"
			>
				<TextInput
					id={'input_srch'}
					type={'text'}
					hold={'검색'}
					class={'w-[600px]'}
				></TextInput>
				<SubmitButton
					id={'srch_sub_btn'}
					class={
						'w-10 bg-crimson text-white hover:bg-[#4a0000] drop-shadow-md'
					}
				>
					검색
				</SubmitButton>
			</form>
			<dl className="w-full overflow-scroll flex-1">
				{res.data.map((dt, idx) => (
					<CourseListItem
						key={`CLI_${idx}`}
						courseId={dt.course.id}
						course={dt.course.name}
						professorId={dt.course.user.userId}
						professor={dt.course.user.name}
					></CourseListItem>
				))}
			</dl>
		</Layout>
	);
};

export default Search;
