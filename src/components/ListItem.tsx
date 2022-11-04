import axios from 'axios';
import { DateToString } from '../util/dateToString';

interface CourseItemProps {
	courseId: number;
	course: string;
	professorId: string;
	professor: string;
}

interface LectureItemProps {
	lectureId: number;
	lecture: string;
	date: string;
}

interface MemberItemProps {
	id: number;
	userId: string;
	name: string;
	uniqueNum: string;
}

export const ApplicationListItem: React.FC<
	Omit<CourseItemProps, 'professor' | 'professorId'> & LectureItemProps
> = (
	props: Omit<CourseItemProps, 'professor' | 'professorId'> &
		LectureItemProps,
) => {
	return (
		<li className="w-full py-1 border border-b-black hover:bg-gray-100">
			<a
				href={`/courses/${props.courseId}`}
				className="font-extrabold text-xl pt-2"
			>
				{props.course}
			</a>
			<a
				href={`/courses/${props.courseId}/${props.lectureId}`}
				className="text-base pt-2"
			>
				{props.lecture}
			</a>
			<p>{DateToString(props.date)}</p>
		</li>
	);
};

export const CourseListItem: React.FC<CourseItemProps> = (
	props: CourseItemProps,
) => {
	return (
		<li
			className="w-full py-1 flex justify-between border border-b-black hover:bg-gray-100 cursor-pointer"
			onClick={function (e) {
				window.location.href = `/courses/${props.courseId}`;
			}}
		>
			<h1>{props.course}</h1>
			<a href={`/courses/list?uid=${props.professorId}`}>
				{props.professor}
			</a>
		</li>
	);
};

export const LectureListItem: React.FC<LectureItemProps> = (
	props: LectureItemProps,
) => {
	return (
		<li
			className="w-full py-1 flex justify-between border border-b-black hover:bg-gray-100 cursor-pointer"
			onClick={function (e) {
				window.location.href = `/courses/lectures/${props.lectureId}`;
			}}
		>
			<h1>{props.lecture}</h1>
			<p>{DateToString(props.date)}</p>
		</li>
	);
};

export const MemberListItem: React.FC<MemberItemProps> = (
	props: MemberItemProps,
) => {
	const memberBan = async () => {
		axios({
			method: 'DELETE',
			url:'http://localhost:3000/applications/drop/'
		});
	};

	return (
		<li className="w-full flex border border-b-black">
			<div className="border border-b-black">{props.userId}</div>
			<div className="border border-b-black">{props.uniqueNum}</div>
			<div className="border border-b-black">{props.name}</div>
		</li>
	);
};
