import { MouseEventHandler, PropsWithChildren } from 'react';
import { ClickButton } from './Button';

interface checkModalProps extends PropsWithChildren {
	modalId: string;
	confirmFunc: MouseEventHandler;
	// cancelFunc?: MouseEventHandler;
}

export const checkModalOpen = async() => {
    const checkForm = document.getElementById(
        `_modal`,
    ) as HTMLDivElement;
    const checkBack = document.getElementById(
        `_back`,
    ) as HTMLDivElement;

    checkForm.classList.replace('opacity-0', 'opacity-100');
    checkForm.classList.replace('z-0', 'z-50');
    checkBack.classList.replace('opacity-0', 'opacity-60');
    checkBack.classList.replace('z-00', 'z-40');
    checkBack.classList.add('blur-sm');
}

export const CheckModal: React.FC<checkModalProps> = (
	props: checkModalProps,
) => {
	const checkModalClose = async () => {
		const checkForm = document.getElementById(
			`${props.modalId}_modal`,
		) as HTMLDivElement;
		const checkBack = document.getElementById(
			`${props.modalId}_back`,
		) as HTMLDivElement;

		checkForm.classList.replace('opacity-100', 'opacity-0');
		checkForm.classList.replace('z-50', 'z-0');
		checkBack.classList.replace('opacity-60', 'opacity-0');
		checkBack.classList.replace('z-40', 'z-0');
		checkBack.classList.remove('blur-sm');
	};

	return (
		<>
			<div
				id={`${props.modalId}_back`}
				className="absolute w-full h-full bg-[#525252] z-0 opacity-0"
			></div>
			<div
				id={`${props.modalId}_modal`}
				className="w-[320px] h-[240px] py-2 rounded-2xl items-center justify-center absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] z-0 opacity-0"
			>
				<p className="text-cetner">{props.children}</p>
				<div className="flex">
					<ClickButton
						id={`${props.modalId}_confirm_clk_btn`}
						class={
							'w-6 bg-crimson text-white hover:bg-[#4a0000] drop-shadow-md'
						}
						onClick={props.confirmFunc}
					>
						확인
					</ClickButton>
					<ClickButton
						id={`${props.modalId}_cancel_clk_btn`}
						class={
							'w-6 border text-crimson border-crimson hover:bg-gray-100 drop-shadow-md'
						}
						onClick={checkModalClose}
					>
						취소
					</ClickButton>
				</div>
			</div>
		</>
	);
};
