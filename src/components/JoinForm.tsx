import React, { useEffect, useState } from 'react';

const JoinForm: React.FC = () => {
	return (
		<form className="w-[480px] h-[640px] bg-white">
			<div>
				<h2>아이디</h2>
				<textarea></textarea>
			</div>
			<div>
				<h2>비밀번호</h2>
				<textarea></textarea>
			</div>
			<div>
				<h2>이름</h2>
				<textarea></textarea>
			</div>
			<div>
				<h2>역할</h2>
				{/* 체크박스 */}
			</div>
			<div>
				<h2>학번</h2>
				<textarea></textarea>
			</div>
            <div>
                <button>회원가입</button>
            </div>
		</form>
	);
};

export default JoinForm;
