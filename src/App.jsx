  const Header = (props) => {
    console.log("Header props", props)
    return (
      <>
        <h1>{props.course}</h1>
      </>
    )
  }
  const Part = (props) => {
    console.log("Part props", props)
    return (
      <>
        <p>{props.part} {props.exercices}</p>
      </>
    )
  }
  const Content = (props) => {
    console.log("Content props", props)
    return (
      <>
        <Part part={props.parts[0]} exercices={props.exercices[0]} />
        <Part part={props.parts[1]} exercices={props.exercices[1]} />
        <Part part={props.parts[2]} exercices={props.exercices[2]} />
      </>
    )
  }
  const Total = (props) => {
    console.log("Total props", props)
    return (
      <>
        <p>Number of exercises : {props.total}</p>
      </>
    )
  }
  
  
  const App = () => {

  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  return (
    <>
      <Header course={course} />
      <Content parts={[part1, part2, part3]} exercices={[exercises1, exercises2, exercises3]}  />
      <Total total={exercises1 + exercises2 + exercises3} />      
    </>
  )
}

export default App