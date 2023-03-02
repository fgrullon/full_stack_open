import Header from './Header';
import Course from './Course';

const Courses = ({ courses }) => {
    return (
      <>
      <Header title="Web development curriculum" />
        {courses.map(course => <Course key={course.id} course={course} />)}
      </>
    );
}

export default Courses;