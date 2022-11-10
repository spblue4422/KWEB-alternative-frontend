import { FormEventHandler, PropsWithChildren } from 'react';

interface FormLayoutProps extends PropsWithChildren {
	submitFunc: FormEventHandler;
	id: string;
	class?: string;
}

export const FormLayout: React.FC<FormLayoutProps> = (
	props: FormLayoutProps,
) => {
	return (
		<form
			id={props.id}
			onSubmit={props.submitFunc}
			className={`${props.class} bg-white mx-auto rounded-2xl flex items-center justify-center`}
		>
			{props.children}
		</form>
	);
};
