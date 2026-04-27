import React from "react"

const Header = (props) => {
    console.log("Header props", props)
    return (
      <>
        <h1>{props.course.name}</h1>
      </>
    )
  }
  const Part = (props) => {
    console.log("Part props", props)
    return (
      <>
        <p>{props.part.name} {props.part.exercises}</p>
      </>
    )
  }
  const Content = ({parts}) => {
    console.log("Content props", parts)
    return (
      <>
        {parts.map(part => <Part key={part.id} part={part} />)}
      </>
    )
  }
  const Total = ({parts}) => {
    console.log("Total props", parts)
    const exercices = []

    parts.map((part) => exercices.push(part.exercises))
    const total = exercices.reduce((sum, value) => { return sum + value}, 0)
    
    return (
      <>
        <p style={{ fontWeight: 'bold' }}>Number of exercises : {total}</p>
      </>
    )
  }
  
  const Course = ({course}) => {
    console.log("Course props", course)
    console.log("Course props parts", course.parts[0])
    return (
      <>
        <Header course={course} />
        <Content parts={course.parts} />
        <Total parts={course.parts}/>
      </>
    )
  }

  export default Course