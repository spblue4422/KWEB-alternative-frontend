import { VscAccount, VscSearch } from 'react-icons/vsc';
import { ClickButton } from './Button';
// BsSearch, TfiSearch
export const Header = () => {
	return (
		<div className="w-full px-[23vw] py-4 flex items-center justify-between z-10 border border-b-crimson">
			<div>
				<p className="text-crimson text-sm">Korea University</p>
				<p className="text-crimson text-xl">Fake BlackBoard</p>
			</div>
			<div className="flex items-center">
				<ClickButton
					id={'srch_clk_btn'}
					class={'flex justify-center w-12 mx-8 hover:bg-gray-200'}
					onClick={function (e) {
						window.location.reload();
					}}
				>
					<VscSearch size={32} className=""></VscSearch>
				</ClickButton>
				<ClickButton
					id={'user_clk_btn'}
					class={'flex justify-center w-12 hover:bg-gray-200'}
					onClick={function (e) {
						window.location.reload();
					}}
				>
					<VscAccount size={32} className=""></VscAccount>
				</ClickButton>
			</div>
		</div>
	);
};
