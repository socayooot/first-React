import "./App.css";

function App(props) {
  return (
    <>
      <header>
        {/* Curly braces tell react I want to read the value inside the variable  */}
        {/* This line below allows me to see Clarice from the props section */}
        <h1>Hello, {props.subject}!</h1>
        {/* Hello, React :)! */}
        {/* $ allows for you to embed things like ) as text */}
        {/* <h1>Hello, {`${subject} :)`}!</h1> */}
        {/* Hello, REACT */}
        {/* Converts the "React" to uppercase */}
        {/* <h1>Hello, {subject.toUpperCase()}</h1> */}
        {/* Hello, 4! */}
        {/* Adds 2 + 2 and displays the result */}
        {/* <h1>Hello, {2 + 2}!</h1> */}
          <button type="button" className="primary">Click this button</button>
      </header>
    </>
  );
}

export default App;