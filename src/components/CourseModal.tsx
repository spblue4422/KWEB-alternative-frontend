import React from 'react';
import axios from 'axios';
import { VscChromeClose } from 'react-icons/vsc';
import { FormLayout } from '../layouts/FormLayout';
import { TextInput } from './Input';
import { SubmitButton } from './Button';
import { modalClose } from '../util/modal';
import { spaceCheck } from '../util/textCheck';

//나중에 add용인지 edit용인지도 확장 가능하게끔
export const CourseModal: React.FC = () => {
	const addCourse = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const inputName = document.getElementById(
			'input_crs_name',
		) as HTMLInputElement;
		const inputDscrp = document.getElementById(
			'input_crs_dscrp',
		) as HTMLInputElement;

		if (!(await spaceCheck([inputName.value, inputDscrp.value]))) {
			alert('입력한 내용을 확인해주세요. 빈 값은 허용되지 않습니다.');
			return;
		}

		await axios({
			method: 'POST',
			url: 'http://localhost:3000/courses/add',
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
					alert(res.data.msg);
					modalClose('course');
					window.location.reload();
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
				id={'course_modal'}
				submitFunc={addCourse}
				class={
					'w-[800px] h-[540px] min-w-[480px] absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] z-0 opacity-0'
				}
			>
				<VscChromeClose
					id="icon_x"
					size={28}
					className="absolute top-6 right-6 cursor-pointer"
					onClick={(e) => {
						modalClose('course');
					}}
				></VscChromeClose>
				<div className="w-[640px] flex flex-col">
					<p className="font-extrabold text-xl text-center">
						코스 추가
					</p>
					<div className="mt-6">
						<p className="font-bold">코스명</p>
						<TextInput
							id={'input_crs_name'}
							type={'text'}
							maxLen={50}
							class={'w-full mt-2'}
						></TextInput>
					</div>
					<div className="mt-2">
						<p className="font-bold">개요</p>
						<textarea
							id="input_crs_dscrp"
							className="mt-2 w-full h-[200px] border border-gray-300 rounded-md px-2 py-1 text-lg resize-none"
						></textarea>
					</div>
					<SubmitButton
						id={'addcrs_sub_btn'}
						class={'bg-crimson text-white hover:bg-[#4a0000] mt-2'}
					>
						Add
					</SubmitButton>
				</div>
			</FormLayout>
		</>
	);
};
