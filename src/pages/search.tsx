import { NextPage } from 'next';
import { SubmitButton } from '../components/Button';
import { TextInput } from '../components/Input';
import { Layout } from '../layouts/Layout';

const Search: NextPage = () => {
	const searchByInput = async () => {
		return;
	};

	return (
		<Layout>
			<form
				onSubmit={searchByInput}
				className="w-full flex justify-between"
			>
				<TextInput
					id={'input_srch'}
					type={'text'}
					hold={'검색'}
					class={'w-[600px]'}
				></TextInput>
				<SubmitButton
					id={'srch_sub_btn'}
					class={
						'w-10 bg-crimson text-white hover:bg-[#4a0000] drop-shadow-md'
					}
				>
					검색
				</SubmitButton>
			</form>
			<dl className="w-full overflow-scroll flex-1"></dl>
		</Layout>
	);
};

export default Search;
