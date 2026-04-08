import { useState } from "react"
import Login from "./pages/Login"
import Cadastro from "./pages/Cadastro"
import Cursos from "./pages/Cursos"
import Admin from "./pages/Admin"

function App(){

const [tela,setTela] = useState("login")
const [usuario,setUsuario] = useState(null)

function sair(){

setUsuario(null)
setTela("login")

}

if(tela==="login"){

return <Login mudarTela={setTela} setUsuario={setUsuario}/>

}

if(tela==="cadastro"){

return <Cadastro mudarTela={setTela}/>

}

if(tela==="cursos"){

return <Cursos usuario={usuario} setTela={setTela} sair={sair}/>

}

if(tela==="admin"){

return <Admin usuario={usuario} setTela={setTela} sair={sair}/>

}

}

export default App
