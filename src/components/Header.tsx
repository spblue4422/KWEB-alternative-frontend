import { VscAccount, VscSearch } from 'react-icons/vsc';
import Link from 'next/link';
import { ClickButton } from './Button';
// BsSearch, TfiSearch
export const Header = () => {
	return (
		<div className="w-full px-[26vw] py-4 z-10 border border-b-crimson min-w-[480px]">
			<div className="flex items-center justify-between min-w-[480px]">
				<Link href="http://localhost:3210">
					<div
						className="cursor-pointer"
					>
						<p className="text-crimson text-sm">Korea University</p>
						<p className="text-crimson text-xl">Fake BlackBoard</p>
					</div>
				</Link>

				<div className="flex items-center">
					<Link href="http://localhost:3210/search">
						<ClickButton
							id={'srch_clk_btn'}
							class={
								'flex justify-center w-12 mx-8 hover:bg-gray-200'
							}
						>
							<VscSearch size={32} className=""></VscSearch>
						</ClickButton>
					</Link>
					<Link href="http://localhost:3210/myPage">
						<ClickButton
							id={'user_clk_btn'}
							class={'flex justify-center w-12 hover:bg-gray-200'}
						>
							<VscAccount size={32} className=""></VscAccount>
						</ClickButton>
					</Link>
				</div>
			</div>
		</div>
	);
};
