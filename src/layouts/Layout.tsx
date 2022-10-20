import { PropsWithChildren } from 'react';
import { Header } from '../components/Header';

export const Layout: React.FC<PropsWithChildren> = (
	props: PropsWithChildren,
) => {
	return (
		<div className="w-full h-[100vh] flex flex-col">
			<Header></Header>
			<div className="mx-[23vw] mt-16 mb-6 flex flex-col flex-1">
				{props.children}
			</div>
		</div>
	);
};
