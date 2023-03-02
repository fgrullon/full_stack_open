
const Header = ({ title }) => {
  return(<h1> { title }</h1>);
}

const CourseTitle = ({ title }) => {
  return(<h3> { title }</h3>);
}

const Part = ({ part }) => {
  return (
    <p> { part.name } {part.exercises} </p>
  );
}

const Totals = ({ parts }) => {
  const total = parts.reduce((s,p) => s + p.exercises, 0);
  return(
    <h4>total of { total } exercises</h4>
  );
}

const Content = ({ parts }) => {
  return (
    <>
      <div>
        {
          parts.map(part => <Part key={part.id} part={part} />)
        }
      </div>
      <div>
        <Totals parts={parts}/>
      </div>
    </>
  );
}
const Course = ({ course }) => {
  return (
    <>
      <CourseTitle title={course.name} />
      <Content parts={course.parts} />
    </>
  );
}

const Courses = ({ courses }) => {
  return (
    <>
    <Header title="Web development curriculum" />
      {courses.map(course => <Course key={course.id} course={course} />)}
    </>
  );
}

const App = () => {
  const courses = [{
      id : 1,
      name : 'Half Stack application development',
      parts : [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    },
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  return (<Courses courses={courses} />);

}

export default App;
