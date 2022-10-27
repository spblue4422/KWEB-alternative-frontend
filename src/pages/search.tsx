import { NextPage } from 'next';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { SubmitButton } from '../components/Button';
import { TextInput } from '../components/Input';
import { CourseListItem } from '../components/ListItem';
import { ResultType } from '../interface/interface';
import { Layout } from '../layouts/Layout';

const Search: NextPage = () => {
	let res: ResultType = { code: '', msg: '', data: [] };
	const [data, setData] = useState(new Array<any>());

	const getAllCourses = async () => {
		res = await (
			await fetch('http://localhost:3000/courses/list/search', {
				credentials: 'include',
			})
		).json();
	};

	const searchAllCoursesByInput = async (
		e: React.FormEvent<HTMLFormElement>,
	) => {
		e.preventDefault();
		const inputSrch = document.getElementById(
			'input_srch',
		) as HTMLInputElement;
		axios({
			method: 'POST',
			url: 'http://localhost:3000/courses/list/search',
			data: {
				searchText: inputSrch.value,
			},
			headers: {
				'Content-Type': 'application/json',
			},
			withCredentials: true,
		}).then((res) => setData(res.data.data));
	};

	useEffect(() => {
		axios({
			method: 'GET',
			url: 'http://localhost:3000/courses/all',
			withCredentials: true,
		}).then((res) => setData(res.data.data));
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
					class={'w-[80%]'}
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
			<ul className="w-full overflow-scroll flex-1">
				{data.map((dt, idx) => (
					<CourseListItem
						key={`CLI_${idx}`}
						courseId={dt.id}
						course={dt.name}
						professorId={dt.user.userId}
						professor={dt.user.name}
					></CourseListItem>
				))}
			</ul>
		</Layout>
	);
};

export default Search;
