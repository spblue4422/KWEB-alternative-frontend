import React, { useState } from 'react';
import { VscChromeClose } from 'react-icons/vsc';
import axios from 'axios';
import { FormLayout } from '../layouts/FormLayout';
import { SubmitButton } from './Button';
import { RadioInput, TextInput } from './Input';
import { modalClose } from '../util/modal';
import { spaceCheck } from '../util/textCheck';

const JoinModal: React.FC = () => {
	const [status, setStatus] = useState('student');

	const join = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const inputId = document.getElementById(
			'input_join_id',
		) as HTMLInputElement;
		const inputPw = document.getElementById(
			'input_join_pw',
		) as HTMLInputElement;
		const inputName = document.getElementById(
			'input_join_nm',
		) as HTMLInputElement;
		const inputUnqNum = document.getElementById(
			'input_join_un',
		) as HTMLInputElement;

		if (
			//빈 값이 있다면
			!(await spaceCheck([
				inputId.value,
				inputPw.value,
				inputName.value,
				inputUnqNum.value,
			]))
		) {
			alert('입력한 내용을 확인해주세요. 빈 값은 허용되지 않습니다.');
			return;
		}
		// 아이디, 비밀번호, 학번 형식 걸거면 여기 걸면 될듯

		await axios({
			method: 'POST',
			url: 'http://localhost:3000/users/add',
			data: {
				userId: inputId.value,
				password: inputPw.value,
				name: inputName.value,
				uniqueNum: inputUnqNum.value,
				status: status,
			},
			headers: {
				'Content-Type': 'application/json',
			},
			withCredentials: true,
		})
			.then((res) => {
				if (res.data.code == 'SUCCESS') {
					alert(res.data.msg);
					modalClose('join');
				} else {
					alert(res.data.msg);
				}
			})
			.catch((error) => {
				alert('알 수 없는 오류입니다. 다시 시도해주세요.');
			});
	};

	return (
		<>
			<div
				id="join_back"
				className="absolute w-full h-full bg-[#666666] z-0 opacity-0"
			></div>
			<FormLayout
				id={'join_modal'}
				submitFunc={join}
				class={
					'w-[480px] h-[500px] absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] opacity-0 z-0 drop-shadow-lg'
				}
			>
				<VscChromeClose
					id="icon_x"
					size={28}
					className="absolute top-6 right-6 cursor-pointer"
					onClick={(e) => {
						modalClose('join');
					}}
				></VscChromeClose>
				<div className="w-[320px] flex flex-col">
					<p className="text-center text-crimson text-2xl mb-6">
						Join with New Account
					</p>
					<div className="w-3/5 flex justify-between mt-3">
						<RadioInput
							id={'radio_std'}
							value={'student'}
							check={status === 'student'}
							changeFunc={function () {
								setStatus('student');
							}}
							radioClass={'w-4 h-4 border-crimson'}
						>
							학생
						</RadioInput>
						<RadioInput
							id={'radio_prof'}
							value={'professor'}
							check={status === 'professor'}
							changeFunc={function () {
								setStatus('professor');
							}}
							radioClass={'w-4 h-4 border-crimson'}
						>
							교수
						</RadioInput>
					</div>
					<TextInput
						id={'input_join_id'}
						type={'text'}
						hold={'ID'}
						class={'w-full mt-3'}
					></TextInput>
					<TextInput
						id={'input_join_pw'}
						type={'password'}
						hold={'Password'}
						class={'w-full mt-3'}
					></TextInput>
					<TextInput
						id={'input_join_nm'}
						type={'text'}
						hold={'이름'}
						class={'w-full mt-3'}
					></TextInput>
					<TextInput
						id={'input_join_un'}
						type={'text'}
						hold={'학번/교번'}
						class={'w-full mt-3'}
					></TextInput>
					<SubmitButton
						id={'signup_sub_btn'}
						class={'w-full bg-crimson text-white mt-6'}
					>
						SIGN UP
					</SubmitButton>
					<p className="text-center text-crimson text-sm mt-6">
						Korea University - Fake Black Board
					</p>
					<a
						href="https://www.github.com/spblue4422"
						className="text-center text-crimson text-sm"
					>
						@spblue4422
					</a>
				</div>
			</FormLayout>
		</>
	);
};

export default JoinModal;
