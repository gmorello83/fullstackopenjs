import { useState } from 'react'

const Button = ({handleClick,lib}) => {
  return (
    <button onClick={handleClick}>{lib}</button>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.'
  ]

  const [selected, setSelected] = useState(0)
  const [mostVoted, setMostVoted] = useState(0)
  const [votes,setVote] = useState(
    {0:0, 1:0, 2:0, 3:0, 4:0 ,5:0 ,6:0}
  )

  const showAnecdote = () => {
    let index = Math.floor(Math.random() * 6) + 1
    console.log("random index : ", index)
    setSelected (index)
  }

  const handleVote = () => {
    const copy = { ...votes } //copy of objet to render
    copy[selected] += 1  // add a vote for the selected anecdote
    if (copy[selected]>=votes[mostVoted]) { setMostVoted(selected) } //update most voted anecdote
    console.log("Votes : ", copy, "most voted : ",mostVoted)
    setVote (copy)
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{anecdotes[selected]}</p>
      <p>{votes[selected]}</p>
      <Button handleClick={() => showAnecdote()} lib="next anecdote"/>
      <Button handleClick={() => handleVote()} lib="vote"/>
      <h1>Anecdote with most votes</h1>
      <p>{anecdotes[mostVoted]}</p>
      <p>{votes[mostVoted]}</p>
    </div>
  )
}

export default App