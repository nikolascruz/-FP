import { useState } from "react";


function Content(props) {
    const [Clicks, setClicks] = useState(0);

    function pressbutton() {
        const new_value = Clicks + 1
        setClicks(new_value)
        alert(`contagem em : ${new_value}`)
    }

    return (
        <div className="App">
            <header className="App-header">

                <img src={props.logo} className="App-logo" alt="logo" />
                <p>
                    Hello <code>world</code> {props.name}
                </p>
                <button onClick={pressbutton}>Clique aqui {Clicks}</button>
                <a
                    className="App-link"
                    href="https://reactjs.org"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Learn React
                </a>
            </header>
        </div>
    );
}

export default Content;