import CourseTitle from './CourseTitle';
import Content from './Content';

const Course = ({ course }) => {
    return (
      <>
        <CourseTitle title={course.name} />
        <Content parts={course.parts} />
      </>
    );
}

export default Course;