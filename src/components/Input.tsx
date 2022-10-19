import { PropsWithChildren } from 'react';

interface TextInputProps extends PropsWithChildren {
	id: string;
	hold: string;
	type: string;
	class?: string;
}

interface RadioInputProps extends PropsWithChildren {
	id: string;
	value: string;
	radioClass?: string;
	textClass?: string
	check: boolean | undefined;
	changeFunc: VoidFunction;
}

export const TextInput: React.FC<TextInputProps> = (props: TextInputProps) => {
	return (
		<input
			id={props.id}
			type={props.type}
			placeholder={props.hold}
			className={`${props.class} border border-gray-300 rounded-md px-2 py-1 text-lg`}
		></input>
	);
};

export const RadioInput: React.FC<RadioInputProps> = (
	props: RadioInputProps,
) => {
	return (
		<label className="cursor-pointer">
			<input
				id={props.id}
				type="radio"
				value={props.value}
				checked={props.check}
				onChange={props.changeFunc}
				className={`${props.radioClass} appearance-none align-middle cursor-pointer border rounded-full checked:border-4`}
			></input>
			<span className={`${props.textClass} align-middle ml-1`}>{props.children}</span>
		</label>
	);
};
