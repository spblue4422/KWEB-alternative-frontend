import { MouseEventHandler, PropsWithChildren } from 'react';

interface ButtonProps extends PropsWithChildren {
	id: string;
	class?: string;
	onClick?: MouseEventHandler;
}

export const ClickButton: React.FC<ButtonProps> = (props: ButtonProps) => {
	return (
		<button
			id={props.id}
			type="button"
			className={`${props.class} rounded-lg py-2`}
			onClick={props.onClick}
		>
			{props.children}
		</button>
	);
};

export const SubmitButton: React.FC<ButtonProps> = (props: ButtonProps) => {
	return (
		<button
			id={props.id}
			type="submit"
			className={`${props.class} rounded-lg py-2`}
		>
			{props.children}
		</button>
	);
};
