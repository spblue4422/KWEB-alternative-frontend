import { NextPage } from 'next';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { SubmitButton, ClickButton } from '../components/Button';
import { TextInput } from '../components/Input';
import { CourseListItem } from '../components/ListItem';
import { Layout } from '../layouts/Layout';

const Search: NextPage = () => {
	const [data, setData] = useState(new Array<any>());

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
	};

	useEffect(() => {
		axios({
			method: 'GET',
			url: 'http://localhost:3000/courses/all',
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
			<div className="z-10">
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
				<ul className="w-full mt-6 overflow-hidden hover:overflow-y-scroll max-h-[240px]">
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
			</div>
		</Layout>
	);
};

export default Search;
