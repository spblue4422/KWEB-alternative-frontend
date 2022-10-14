import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export const LoginForm: React.FC = () => {
	return (
		<form className="w-[480px] h-[360px] bg-white mx-auto border-black rounded-2xl flex items-center justify-center">
			<div className="w-[320px]">
				<div className="flex justify-between">
					<h2>아이디</h2>
					<textarea></textarea>
				</div>
				<div className="flex justify-between">
					<h2>비밀번호</h2>
					<textarea></textarea>
				</div>
				<button className="w-full bg-red-700 text-white rounded-lg py-1 mt-2">
					로그인
				</button>
			</div>
		</form>
	);
};
