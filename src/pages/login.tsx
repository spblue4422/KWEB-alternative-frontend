import type { NextPage } from 'next';
import JoinModal from '../components/JoinModal';
import { LoginModal } from '../components/LoginModal';

const Login: NextPage = () => {
	return (
		<div className="bg-crimson w-full h-[100vh] flex items-center z-10">
			<JoinModal></JoinModal>
			<LoginModal></LoginModal>
		</div>
	);
};

export default Login;
