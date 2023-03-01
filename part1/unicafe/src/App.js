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
    <table>
      <tbody>
      <StatisticLine title="good" value={good}/>
      <StatisticLine title="neutral" value={neutral}/>
      <StatisticLine title="bad" value={bad}/>
      <StatisticLine title="all" value={all}/>
      <StatisticLine title="average" value={average}/>
      <StatisticLine title="positive" value={positive+' %'}/>
      </tbody>
    </table>

  );
 }else{
  return (
    <div>No feedback given</div>
  )
 }

}

const StatisticLine = ({ title, value }) => {
  return (
    <tr>
      <td>{ title } </td>
      <td>{ value }</td>
    </tr> 
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
