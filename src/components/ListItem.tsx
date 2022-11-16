import axios from 'axios';
import Link from 'next/link';
import { SlBan } from 'react-icons/sl';
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
		<li>
			<Link href={`/courses/lectures/${props.lectureId}`}>
				<div className="w-full py-2 border border-b-black hover:bg-gray-100 cursor-pointer">
					<Link href={`/courses/${props.courseId}`}>
						<p className="font-extrabold text-xl inline-block">
							{props.course}
						</p>
					</Link>
					<p>{props.lecture}</p>
					<p>{DateToString(props.date)}</p>
				</div>
			</Link>
		</li>
	);
};

export const CourseListItem: React.FC<CourseItemProps> = (
	props: CourseItemProps,
) => {
	return (
		<li>
			<Link href={`/courses/${props.courseId}`}>
				<div className="w-full py-1 flex justify-between border border-b-black hover:bg-gray-100 cursor-pointer">
					<p>{props.course}</p>
					<p>{props.professor}</p>
				</div>
			</Link>
		</li>
	);
};

export const LectureListItem: React.FC<LectureItemProps> = (
	props: LectureItemProps,
) => {
	return (
		<li>
			<Link href={`/courses/lectures/${props.lectureId}`}>
				<div className="w-full py-1 flex justify-between border border-b-black hover:bg-gray-100 cursor-pointer">
					<p>{props.lecture}</p>
					<p>{DateToString(props.date)}</p>
				</div>
			</Link>
		</li>
	);
};

export const MemberListItem: React.FC<MemberItemProps> = (
	props: MemberItemProps,
) => {
	const memberBan = async () => {
		axios({
			method: 'DELETE',
			url: 'http://localhost:3000/applications/drop/',
		});
	};

	return (
		<li className="w-full flex">
			<div className="flex-1 border-b border-l border-black text-center">
				{props.userId}
			</div>
			<div className="flex-1 border-b border-l border-black text-center">
				{props.uniqueNum}
			</div>
			<div className="flex-1 border-b border-x border-black text-center">
				{props.name}
			</div>
			{/* <div className="w-[30px] flex border-black justify-center items-center">
				<SlBan size={16}></SlBan>
			</div> */}
		</li>
	);
};
