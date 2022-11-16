import { MouseEventHandler, PropsWithChildren } from 'react';

import { modalClose } from '../util/modal';
import { ClickButton } from './Button';

interface checkModalProps extends PropsWithChildren {
	confirmFunc: MouseEventHandler;
}

export const CheckModal: React.FC<checkModalProps> = (
	props: checkModalProps,
) => {
	return (
		<>
			<div
				id={`check_back`}
				className="absolute w-full h-full bg-[#525252] z-0 opacity-0"
			></div>
			<div
				id={`check_modal`}
				className="w-[320px] h-[240px] bg-white drop-shadow-md rounded-2xl flex items-center justify-center absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] z-0 opacity-0"
			>
				<div className="w-[180px] mx-auto">
					<p className="text-center">{props.children}</p>
					<div className="w-full flex justify-between px-2 pt-8">
						<ClickButton
							id={`check_confirm_clk_btn`}
							class={
								'w-12 bg-crimson text-white hover:bg-[#4a0000] drop-shadow-md'
							}
							onClick={props.confirmFunc}
						>
							확인
						</ClickButton>
						<ClickButton
							id={`check_cancel_clk_btn`}
							class={
								'w-12 border text-crimson border-crimson hover:bg-gray-100 drop-shadow-md'
							}
							onClick={(e) => {
								modalClose('check');
							}}
						>
							취소
						</ClickButton>
					</div>
				</div>
			</div>
		</>
	);
};
