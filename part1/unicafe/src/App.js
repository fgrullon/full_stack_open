import { useState } from 'react';

const Title = ({ text }) => {
  return (
    <h1> { text }</h1>
  );
}

const Button = ({ handleClick, text }) => {
  return (
    <button onClick={handleClick}>{ text }</button>
  );
}

const Statistics = ({ title, total }) => {
  return (
      <p>{ title } { total }</p>
  );
}
const App = () => {

  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div className="App">
      <Title text="give feedback" />

      <Button text="good" handleClick={() => setGood(good + 1)} />
      <Button text="neutral" handleClick={() => setNeutral(neutral + 1)} />
      <Button text="bad" handleClick={() => setBad(bad + 1)} />

      <Title text="statistics" />

      <Statistics title="good" total={good}/>
      <Statistics title="neutral" total={neutral}/>
      <Statistics title="bad" total={bad}/>

    </div>
  );
}

export default App;
