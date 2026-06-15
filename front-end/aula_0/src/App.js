import persons from "./data/person"
import peoples from "./data/people"
import "./app.css"

function List(props) {
  return (
    <ul>
      {props.list.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ul>
  );
}

function calculo_imc(peso, altura) {
  let imc = peso / (altura * altura)
  if (imc < 18.5) {
    return ("Abaixo do peso: " + imc.toFixed(2))
  } else if (imc < 25) {
    return ("Peso normal: " + imc.toFixed(2))
  } else if (imc < 30) {
    return ("Acima do peso: " + imc.toFixed(2))
  } else {
    return ("Obesidade: " + imc.toFixed(2))
  }
}

function App() {
  return (

    <div className="container">
      <h1>Nomes</h1>
      <List list={persons.map((person) => person.name)} />
      <h1>Idades</h1>
      <List list={persons.map((person) => person.age)} />
      <h1>Profissões</h1>
      <List
        list={persons.map((person) => {
          if (person.job === "Developer") {
            return `${person.job} - Gamer`;
          } else {
            return person.job;
          }
        })}
      />
      <h1>IMC</h1>
      <List list={peoples.map((people) => calculo_imc(people.peso, people.altura))} />

    </div>
  );
}

export default App;
