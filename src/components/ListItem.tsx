interface ItemProps {
	courseId: number;
	course: string;
	lectureId: number;
	lecture: string;
	date: Date;
}

interface CourseItemProps {
	courseId: number;
	course: string;
	professor: string;
}

interface LectureItemProps {
	lectureId: number;
	lecture: string;
	date: Date;
}

export const ApplicationListItem: React.FC<
	Omit<CourseItemProps, 'professor'> & LectureItemProps
> = (props: Omit<CourseItemProps, 'professor'> & LectureItemProps) => {
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
			<p>{props.date.toString()}</p>
		</li>
	);
};

export const CourseListItem: React.FC<CourseItemProps> = (
	props: CourseItemProps,
) => {
	return (
		<li
			className="w-full py-1 flex justify-between border border-b-black hover:bg-gray-100"
			onClick={function (e) {
				window.location.href = `/courses/${props.courseId}`;
			}}
		>
			<h1>{props.course}</h1>
			<p>{props.professor}</p>
		</li>
	);
};

export const LectureListItem: React.FC<LectureItemProps> = (
	props: LectureItemProps,
) => {
	return (
		<li className="w-full py-1 border border-b-black hover:bg-gray-100"></li>
	);
};
