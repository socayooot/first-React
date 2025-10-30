import "./App.css";

const subject = "React";
function App() {
  return (
    <>
      <header>
        //Curly braces tell react I want to read the value inside the variable 
        {/* Hello, React :)! */}
        {/* $ allows for you to embed things like ) as text */}
        <h1>Hello, {`${subject} :)`}!</h1>
        {/* Hello, REACT */}
        {/* Converts the "React" to uppercase */}
        <h1>Hello, {subject.toUpperCase()}</h1>
        {/* Hello, 4! */}
        {/* Adds 2 + 2 and displays the result */}
        <h1>Hello, {2 + 2}!</h1>
          <button type="button" className="primary">Click this button</button>
      </header>
    </>
  );
}

export default App;