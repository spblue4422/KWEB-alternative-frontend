import type { NextPage } from 'next';
import { LoginForm } from '../components/LoginForm';

const Login: NextPage = () => {
	return (
		<div className="bg-gradient-to-br from-red-900 to-red-300 w-full h-[100vh] flex items-center">
			<LoginForm></LoginForm>
		</div>
	);
};

export default Login;
