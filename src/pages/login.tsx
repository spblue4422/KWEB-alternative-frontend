import type { NextPage } from 'next';
import JoinForm from '../components/JoinForm';
import { LoginForm } from '../components/LoginForm';

const Login: NextPage = () => {
	return (
		<div className="bg-crimson w-full h-[100vh] flex items-center z-10">
			<JoinForm></JoinForm>
			<LoginForm></LoginForm>
		</div>
	);
};

export default Login;
