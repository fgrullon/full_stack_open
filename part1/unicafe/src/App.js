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

const Statistics = ({ good, neutral, bad }) => {

  const all = good + neutral + bad;
  const average = (good - bad) / all;
  const positive = (good / all) * 100;
 if(all > 0) {
  return (
    <>
      <Stats title="good" total={good}/>
      <Stats title="neutral" total={neutral}/>
      <Stats title="bad" total={bad}/>
      <Stats title="all" total={all}/>
      <Stats title="average" total={average}/>
      <Stats title="positive" total={positive+' %'}/>
    </>
  );
 }else{
  return (
    <div>No feedback given</div>
  )
 }

}

const Stats = ({ title, total }) => {
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

      <Statistics good={good} neutral={neutral} bad={bad}/>


    </div>
  );
}

export default App;
