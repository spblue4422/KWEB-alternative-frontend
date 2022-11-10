import { VscAccount, VscSearch } from 'react-icons/vsc';
import Link from 'next/link';
import axios from 'axios';
import { ClickButton } from './Button';

export const Header = () => {
	const logOut = async () => {
		axios({
			method: 'GET',
			url: 'http://localhost:3000/auth/logout',
			withCredentials: true,
		})
			.then((res) => {
				alert('로그아웃 성공');
				window.location.href = 'http://localhost:3210/login';
			})
			.catch((error) => {
				if (error.response.status == 401) {
					alert('이미 로그아웃된 상태입니다.');
					window.location.href = 'http://localhost:3210/login';
				} else {
					alert('알 수 없는 오류입니다. 다시 시도해주세요.');
				}
			});
	};

	return (
		<div className="w-full px-[26vw] py-4 z-10 border border-b-crimson min-w-[480px]">
			<div className="flex items-center justify-between min-w-[480px]">
				<Link href="http://localhost:3210">
					<div className="cursor-pointer">
						<p className="text-crimson text-sm">Korea University</p>
						<p className="text-crimson text-xl">Fake BlackBoard</p>
					</div>
				</Link>

				<div className="flex items-center">
					<Link href="http://localhost:3210/search">
						<ClickButton
							id={'srch_clk_btn'}
							class={
								'flex justify-center w-12 mr-4 hover:bg-gray-200'
							}
						>
							<VscSearch size={32} className=""></VscSearch>
						</ClickButton>
					</Link>
					<Link href="http://localhost:3210/myPage">
						<ClickButton
							id={'user_clk_btn'}
							class={
								'flex justify-center w-12 mr-4 hover:bg-gray-200'
							}
						>
							<VscAccount size={32} className=""></VscAccount>
						</ClickButton>
					</Link>
					<p
						className="text-crimson text-base cursor-pointer"
						onClick={logOut}
					>
						Log Out
					</p>
				</div>
			</div>
		</div>
	);
};
