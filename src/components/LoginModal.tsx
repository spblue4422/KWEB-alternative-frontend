import React from 'react';
import axios from 'axios';
import { TextInput } from './Input';
import { SubmitButton, ClickButton } from './Button';
import { FormLayout } from '../layouts/FormLayout';
import { modalOpen } from '../util/modal';

export const LoginModal: React.FC = () => {
	const login = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const inputId = document.getElementById('input_id') as HTMLInputElement;
		const inputPw = document.getElementById('input_pw') as HTMLInputElement;

		await axios({
			method: 'POST',
			url: 'http://localhost:3000/auth/login',
			data: {
				userId: inputId.value,
				password: inputPw.value,
			},
			headers: {
				'Content-Type': 'application/json',
			},
			withCredentials: true,
		})
			.then((res) => {
				alert('로그인 성공');
				window.location.href = 'http://localhost:3210/';
			})
			.catch((error) => {
				if (error.response.status == 401) {
					alert('잘못된 아이디/비밀번호/상태 정보입니다.');
				} else {
					alert('알 수 없는 오류입니다. 다시 시도해주세요.');
				}
			});
	};

	return (
		<FormLayout
			id={'login_modal'}
			submitFunc={login}
			class={'w-[480px] h-[380px] z-10'}
		>
			<div className="w-[320px] flex flex-col">
				<p className="text-center text-crimson text-2xl mb-6">
					Login to Your Account
				</p>
				<TextInput
					id={'input_id'}
					type={'text'}
					hold={'ID'}
					class={'w-full mt-2'}
				></TextInput>
				<TextInput
					id={'input_pw'}
					type={'password'}
					hold={'Password'}
					class={'w-full mt-3'}
				></TextInput>
				<SubmitButton
					id={'login_sub_btn'}
					class={'w-full bg-crimson text-white hover:bg-[#4a0000] mt-6'}
				>
					LOGIN
				</SubmitButton>
				<ClickButton
					id={'signup_clk_btn'}
					class={'w-full border text-crimson border-crimson hover:bg-gray-100 mt-2'}
					onClick={(e) => {
						modalOpen('join');
					}}
				>
					SIGN UP
				</ClickButton>
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
	);
};
