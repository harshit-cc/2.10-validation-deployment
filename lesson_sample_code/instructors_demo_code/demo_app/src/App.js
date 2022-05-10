import SimpleForm from "./components/SimpleForm";

function App() {
  return (
    <> 
      <h1>{process.env.REACT_APP_TITLE}</h1>
      <SimpleForm/>
    </>
  );
}

export default App;
