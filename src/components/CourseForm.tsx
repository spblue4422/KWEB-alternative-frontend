import React, { useState } from 'react';
import axios from 'axios';
import { VscChromeClose } from 'react-icons/vsc';
import { FormLayout } from '../layouts/FormLayout';
import { TextInput } from './Input';

//나중에 add용인지 edit용인지도 확장 가능하게끔
export const CourseForm: React.FC = () => {
	const courseModalClose = async () => {
		const courseForm = document.getElementById(
			'course_form',
		) as HTMLDivElement;
		const courseBack = document.getElementById(
			'course_back',
		) as HTMLDivElement;

		const inputName = document.getElementById(
			'input_crs_name',
		) as HTMLInputElement;
		const inputDscrp = document.getElementById(
			'input_crs_dscrp',
		) as HTMLInputElement;

		courseForm.classList.replace('opacity-100', 'opacity-0');
		courseForm.classList.replace('z-30', 'z-0');
		courseBack.classList.replace('opacity-60', 'opacity-0');
		courseBack.classList.replace('z-20', 'z-0');
		courseBack.classList.remove('blur-sm');

		//
		inputName.value = '';
		inputDscrp.value = '';
	};

	const addCourse = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const inputName = document.getElementById(
			'input_crs_name',
		) as HTMLInputElement;
		const inputDscrp = document.getElementById(
			'input_crs_dscrp',
		) as HTMLInputElement;

		await axios({
			method: 'POST',
			url: 'http://localhost:3210/courses/add',
			data: {
				name: inputName.value,
				description: inputDscrp.value,
			},
			headers: {
				'Content-Type': 'application/json',
			},
			withCredentials: true,
		})
			.then((res) => {
				if (res.data.code == 'SUCCESS') {
					alert('코스등록 성공');
					courseModalClose();
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
	};

	return (
		<>
			<div
				id="course_back"
				className="absolute w-full h-full bg-[#666666] z-0 opacity-0"
			></div>
			<FormLayout
				id={'course_form'}
				submitFunc={addCourse}
				class={
					'w-[960px] h-[600px] min-w-[480px] absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] z-0 opacity-0'
				}
			>
				<VscChromeClose
					id="icon_x"
					size={28}
					className="absolute top-6 right-6 cursor-pointer"
					onClick={courseModalClose}
				></VscChromeClose>
				<div className="w-[720px] flex flex-col">
					<p>코스 추가</p>
					<p>{}</p>
					<TextInput
						id={'input_crs_name'}
						type={'text'}
						class={''}
					></TextInput>
					<TextInput
						id={'input_crs_dscrp'}
						type={'text'}
						class={'h-[200px]'}
					></TextInput>
				</div>
			</FormLayout>
		</>
	);
};
