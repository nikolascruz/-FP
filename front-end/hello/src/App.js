import logo from './logo.svg';
import './App.css';
import Content from './content';
var name = " Nikolas"

function App() {
  return (
    <Content logo={logo}
      name={name} />
  );
}

export default App;
