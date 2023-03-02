
const Header = ({ title }) => {
  return(<h1> { title }</h1>);
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
      <Header title={course.name} />
      <Content parts={course.parts} />
    </>
  );
}

const App = () => {
  const course = {
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
      }
    ]
  }

  return (<Course course={course} />);

}

export default App;
