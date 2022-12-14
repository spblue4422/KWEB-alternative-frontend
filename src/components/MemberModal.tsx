import { useEffect, useState } from 'react';
import axios from 'axios';
import { VscChromeClose } from 'react-icons/vsc';
import { MemberListItem } from './ListItem';
import { modalClose } from '../util/modal';

interface memberModalProps {
	courseId: number;
	self: boolean;
}

export const MemberModal: React.FC<memberModalProps> = (
	props: memberModalProps,
) => {
	const [mdata, setMdata] = useState(new Array<any>());

	//banApplication 구현에서 벽을 느껴버림.
	//처음부터 설계를 잘 하고 들어갔어야 했는데,
	//망해버린 집이된 것 같네.
	//설계를 어떻게 고쳐야할 지 감이 안옴 ㄹㅇ;
	//listItem 내부에 있는 ban을 checkmodal에 어떻게 집어넣어야하지

	useEffect(() => {
		if (!props.courseId || !props.self) return;
		axios({
			method: 'GET',
			url: `http://localhost:3000/courses/users/list?cid=${props.courseId}`,
			withCredentials: true,
		})
			.then((res) => {
				if (res.data.code == 'SUCCESS') {
					setMdata(res.data.data);
				} else {
					alert(res.data.msg);
				}
			})
			.catch((error) => {
				if (error.response.status == 401) {
					alert('로그인이 필요한 화면입니다.');
					window.location.href = 'http://localhost:3210/login';
				} else {
					alert(
						props.courseId + '서버 에러입니다. 다시 시도해주세요.',
					);
				}
			});
	}, [props.courseId]);

	return (
		<>
			<div
				id="member_back"
				className="absolute w-full h-full bg-[#666666] z-0 opacity-0"
			></div>
			<div
				id="member_modal"
				className="bg-white mx-auto py-6 rounded-2xl flex items-center justify-center w-[420px] max-h-[600px] absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] z-0 opacity-0"
			>
				<VscChromeClose
					id="icon_x"
					size={28}
					className="absolute top-3 right-3 cursor-pointer"
					onClick={(e) => {
						modalClose('member');
					}}
				></VscChromeClose>
				<div className="w-[322px] flex flex-col">
					<p className="font-bold text-lg text-center">수강 인원</p>
					<div className="w-full flex mt-2">
						<div className="flex-1 border-y border-l border-black text-center">
							아이디
						</div>
						<div className="flex-1 border-y border-l border-black text-center">
							학번
						</div>
						<div className="flex-1 border-y border-x border-black text-center">
							이름
						</div>
					</div>
					<ul className="w-full">
						{mdata.map((dt, idx) => (
							<MemberListItem
								key={`MLI_${dt.id}`}
								id={dt.id}
								userId={dt.userId}
								name={dt.name}
								uniqueNum={dt.uniqueNum}
							></MemberListItem>
						))}
					</ul>
				</div>
			</div>
		</>
	);
};
