import React from 'react';
import axios from 'axios';
import { VscChromeClose } from 'react-icons/vsc';
import { FormLayout } from '../layouts/FormLayout';
import { TextInput } from './Input';

interface lectureFormProps {
	courseId: number;
	courseName: string;
}

//나중에 add용인지 edit용인지도 확장 가능하게끔
export const LectureForm: React.FC<lectureFormProps> = (
	props: lectureFormProps,
) => {
	const lectureModalClose = async () => {
		const lectureForm = document.getElementById(
			'lecture_form',
		) as HTMLDivElement;
		const lectureBack = document.getElementById(
			'lecture_back',
		) as HTMLDivElement;

		const inputTitle = document.getElementById(
			'input_lec_ttl',
		) as HTMLInputElement;
		const inputCtnt = document.getElementById(
			'input_lec_ctnt',
		) as HTMLInputElement;

		lectureForm.classList.replace('opacity-100', 'opacity-0');
		lectureForm.classList.replace('z-30', 'z-0');
		lectureBack.classList.replace('opacity-60', 'opacity-0');
		lectureBack.classList.replace('z-20', 'z-0');
		lectureBack.classList.remove('blur-sm');

		//
		inputTitle.value = '';
		inputCtnt.value = '';
	};
	const addLecture = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const inputTitle = document.getElementById(
			'input_lec_ttl',
		) as HTMLInputElement;
		const inputCtnt = document.getElementById(
			'input_lec_ctnt',
		) as HTMLInputElement;

		await axios({
			method: 'POST',
			url: 'http://localhost:3210/courses/lectures/add',
			data: {
				courseId: props.courseId,
				title: inputTitle.value,
				content: inputCtnt.value,
			},
			headers: {
				'Content-Type': 'application/json',
			},
			withCredentials: true,
		})
			.then((res) => {
				if (res.data.code == 'SUCCESS') {
					alert('강의등록 성공');
					lectureModalClose();
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

	// const editLecture = async (e: React.FormEvent<HTMLFormElement>) => {
	// 	e.preventDefault();

	//     const inputTitle = document.getElementById(
	// 		'input_lec_ttl',
	// 	) as HTMLInputElement;
	// 	const inputCtnt = document.getElementById(
	// 		'input_lec_ctnt',
	// 	) as HTMLInputElement;

	//     await axios({
	// 		method: 'POST',
	// 		url: 'http://localhost:3210/courses/lectures/add',
	// 		data: {
	// 			courseId: props.courseId,
	// 			title: inputTitle.value,
	// 			content: inputCtnt.value,
	// 		},
	// 		headers: {
	// 			'Content-Type': 'application/json',
	// 		},
	// 		withCredentials: true,
	// 	})
	// 		.then((res) => {
	// 			if (res.data.code == 'SUCCESS') {
	// 				alert('강의등록 성공');
	// 				lectureModalClose();
	// 			} else {
	// 				alert(res.data.msg);
	// 			}
	// 		})
	// 		.catch((error) => {
	// 			if (error.response.status == 401) {
	// 				alert('로그인이 필요한 화면입니다.');
	// 				window.location.href = 'http://localhost:3210/login';
	// 			} else {
	// 				alert('알 수 없는 오류입니다. 다시 시도해주세요.');
	// 			}
	// 		});
	// };

	return (
		<>
			<div
				id="lecture_back"
				className="absolute w-full h-full bg-[#666666] z-0 opacity-0"
			></div>
			<FormLayout
				id={'lecture_form'}
				submitFunc={addLecture}
				class={
					'w-[960px] h-[600px] min-w-[480px] absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] z-0 opacity-0'
				}
			>
				<VscChromeClose
					id="icon_x"
					size={28}
					className="absolute top-6 right-6 cursor-pointer"
					onClick={lectureModalClose}
				></VscChromeClose>
				<div className="w-[720px] flex flex-col">
					<p>강의 게시물 추가</p>
					<p>{props.courseName}</p>
					<TextInput
						id={'input_lec_ttl'}
						type={'text'}
						class={''}
					></TextInput>
					<TextInput
						id={'input_lec_ctnt'}
						type={'text'}
						class={'h-[400px]'}
					></TextInput>
				</div>
			</FormLayout>
		</>
	);
};
