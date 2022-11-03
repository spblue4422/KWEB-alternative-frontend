import { VscAccount, VscSearch } from 'react-icons/vsc';
import { ClickButton } from './Button';
// BsSearch, TfiSearch
export const Header = () => {
	return (
		<div className="w-full px-[26vw] py-4 z-10 border border-b-crimson min-w-[480px]">
			<div className="flex items-center justify-between min-w-[480px]">
				<div
                    className="cursor-pointer"
					onClick={function (e) {
						window.location.href = 'http://localhost:3210';
					}}
				>
					<p className="text-crimson text-sm">Korea University</p>
					<p className="text-crimson text-xl">Fake BlackBoard</p>
				</div>
				<div className="flex items-center">
					<ClickButton
						id={'srch_clk_btn'}
						class={
							'flex justify-center w-12 mx-8 hover:bg-gray-200'
						}
						onClick={function (e) {
							window.location.href =
								'http://localhost:3210/search';
						}}
					>
						<VscSearch size={32} className=""></VscSearch>
					</ClickButton>
					<ClickButton
						id={'user_clk_btn'}
						class={'flex justify-center w-12 hover:bg-gray-200'}
						onClick={function (e) {
							window.location.href =
								'http://localhost:3210/myPage';
						}}
					>
						<VscAccount size={32} className=""></VscAccount>
					</ClickButton>
				</div>
			</div>
		</div>
	);
};
