import { useState } from 'react'

const Button = (props) => {
  return (
    <button onClick={props.handleClick}>{props.lib}</button>
  )
}

const StatisticLine = ({text, value}) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}

const Statistics = ({good, neutral, bad}) => {
  let all = good + neutral + bad
  let score = good - bad
  
    if (all == 0) {
      return (<h3>no feedback given</h3>)
    }else{
      return (
      <table>
        <tbody>
          <StatisticLine text="good" value={good}/>
          <StatisticLine text="neutral" value={neutral}/>
          <StatisticLine text="bad" value={bad}/>
          <StatisticLine text="all" value={good + neutral + bad}/>
          <StatisticLine text="average" value={score / all}/>
          <StatisticLine text="positive" value={good / all * 100}/>
        </tbody>
      </table>
      )
    }
}

const App = () => {
  // enregistrer les clics de chaque bouton dans un état différent
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  
  const handlefeedback = (choice) => {
    switch (choice) {
      case "good":
        setGood(good + 1)
        break;

      case "neutral":
        setNeutral(neutral + 1)
        break;

      case "bad":
        setBad(bad + 1)
        break;
    
      default:
        break;
    }    
  }
  
  return (
    <div>
      <h1>Give feedback</h1>
      <Button handleClick={() => handlefeedback("good")} lib="Good"></Button>
      <Button handleClick={() => handlefeedback("neutral")} lib="Neutral"></Button>
      <Button handleClick={() => handlefeedback("bad")} lib="bad"></Button>
      <h1>Statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

export default App