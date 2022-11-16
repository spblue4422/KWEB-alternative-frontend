import React from 'react';
import axios from 'axios';
import { VscChromeClose } from 'react-icons/vsc';
import { FormLayout } from '../layouts/FormLayout';
import { TextInput } from './Input';
import { SubmitButton } from './Button';
import { modalClose } from '../util/modal';
import { spaceCheck } from '../util/textCheck';

interface lectureModalProps {
	courseId: number;
	courseName: string;
}

//나중에 add용인지 edit용인지도 확장 가능하게끔
export const LectureModal: React.FC<lectureModalProps> = (
	props: lectureModalProps,
) => {
	const addLecture = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const inputTitle = document.getElementById(
			'input_lec_ttl',
		) as HTMLInputElement;
		const inputCtnt = document.getElementById(
			'input_lec_ctnt',
		) as HTMLInputElement;

		if (!(await spaceCheck([inputTitle.value, inputCtnt.value]))) {
			alert('입력한 내용을 확인해주세요. 빈 값은 허용되지 않습니다.');
			return;
		}

		await axios({
			method: 'POST',
			url: 'http://localhost:3000/courses/lectures/add',
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
					alert(res.data.msg);
					modalClose('lecture');
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
				id="lecture_back"
				className="absolute w-full h-full bg-[#666666] z-0 opacity-0"
			></div>
			<FormLayout
				id={'lecture_modal'}
				submitFunc={addLecture}
				class={
					'w-[800px] h-[600px] min-w-[480px] absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] z-0 opacity-0'
				}
			>
				<VscChromeClose
					id="icon_x"
					size={28}
					className="absolute top-6 right-6 cursor-pointer"
					onClick={(e) => {
						modalClose('lecture');
					}}
				></VscChromeClose>
				<div className="w-[640px] flex flex-col">
					<p className="font-extrabold text-xl">
						강의 추가 - {props.courseName}
					</p>
					<div className="mt-6">
						<p className="font-bold">제목</p>
						<TextInput
							id={'input_lec_ttl'}
							type={'text'}
							maxLen={25}
							class={'w-full mt-2'}
						></TextInput>
					</div>
					<div className="mt-2">
						<p className="font-bold">내용</p>
						<textarea
							id="input_lec_ctnt"
							className="mt-2 w-full h-[260px] border border-gray-300 rounded-md px-2 py-1 text-lg resize-none"
						></textarea>
					</div>
					<SubmitButton
						id={'addlec_sub_btn'}
						class={'bg-crimson text-white hover:bg-[#4a0000] mt-2'}
					>
						Add
					</SubmitButton>
				</div>
			</FormLayout>
		</>
	);
};
