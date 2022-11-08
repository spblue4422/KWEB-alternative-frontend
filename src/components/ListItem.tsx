import axios from 'axios';
import Link from 'next/link';
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
				<div className="w-full py-1 border border-b-black hover:bg-gray-100 cursor-pointer">
					<Link href={`/courses/${props.courseId}`}>
						<p className="font-extrabold text-xl pt-2 inline-block">
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
		<li className="w-full flex border border-b-black">
			<div className="border border-b-black">{props.userId}</div>
			<div className="border border-b-black">{props.uniqueNum}</div>
			<div className="border border-b-black">{props.name}</div>
		</li>
	);
};
