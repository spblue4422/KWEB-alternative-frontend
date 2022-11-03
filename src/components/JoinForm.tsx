import React, { useEffect, useState } from 'react';
import { VscChromeClose } from 'react-icons/vsc';
import axios from 'axios';
import { FormLayout } from '../layouts/FormLayout';
import { SubmitButton } from './Button';
import { RadioInput, TextInput } from './Input';

const JoinForm: React.FC = () => {
	const [status, setStatus] = useState('student');

	const isChecked = () => {
		if (status == 'student') {
			return true;
		} else {
			return false;
		}
	};

	const joinModalClose = async () => {
		const joinForm = document.getElementById('join_form') as HTMLDivElement;
		const joinBack = document.getElementById('join_back') as HTMLDivElement;
		const inputId = document.getElementById(
			'input_new_id',
		) as HTMLInputElement;
		const inputPw = document.getElementById(
			'input_new_pw',
		) as HTMLInputElement;
		const inputName = document.getElementById(
			'input_new_nm',
		) as HTMLInputElement;
		const inputUnqNum = document.getElementById(
			'input_new_un',
		) as HTMLInputElement;

		joinForm.classList.replace('opacity-100', 'opacity-0');
		joinForm.classList.replace('z-30', 'z-0');
		joinBack.classList.replace('opacity-60', 'opacity-0');
		joinBack.classList.replace('z-20', 'z-0');
		joinBack.classList.remove('blur-sm');

		inputId.value = '';
		inputPw.value = '';
		inputName.value = '';
		inputUnqNum.value = '';
		setStatus('student');
	};

	const join = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const inputId = document.getElementById(
			'input_new_id',
		) as HTMLInputElement;
		const inputPw = document.getElementById(
			'input_new_pw',
		) as HTMLInputElement;
		const inputName = document.getElementById(
			'input_new_nm',
		) as HTMLInputElement;
		const inputUnqNum = document.getElementById(
			'input_new_un',
		) as HTMLInputElement;

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
					alert('회원가입 성공');
					joinModalClose();
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
				id={'join_form'}
				submitFunc={join}
				class={
					'w-[480px] h-[500px] absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] opacity-0 z-0 drop-shadow-lg'
				}
			>
				<VscChromeClose
					id="icon_x"
					size={28}
					className="absolute top-6 right-6 cursor-pointer"
					onClick={joinModalClose}
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
						id={'input_new_id'}
						type={'text'}
						hold={'ID'}
						class={'w-full mt-3'}
					></TextInput>
					<TextInput
						id={'input_new_pw'}
						type={'password'}
						hold={'Password'}
						class={'w-full mt-3'}
					></TextInput>
					<TextInput
						id={'input_new_nm'}
						type={'text'}
						hold={'이름'}
						class={'w-full mt-3'}
					></TextInput>
					<TextInput
						id={'input_new_un'}
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

export default JoinForm;
