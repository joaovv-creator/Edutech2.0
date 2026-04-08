import { useState } from "react"
import { supabase } from "../services/supabase"

export default function Login({ mudarTela,setUsuario }){

const [email,setEmail] = useState("")
const [senha,setSenha] = useState("")

async function logar(){

const { data,error } = await supabase
.from("usuarios")
.select("*")
.eq("email",email)
.eq("senha",senha)
.single()

if(error){

alert("Email ou senha incorretos")
return

}

setUsuario(data)

if(data.admin){

mudarTela("admin")

}else{

mudarTela("cursos")

}

}

return(

<div className="container">

<div className="card-form">

<h2>Login</h2>

<input
placeholder="Email"
value={email}
onChange={(e)=>setEmail(e.target.value)}
/>

<input
type="password"
placeholder="Senha"
value={senha}
onChange={(e)=>setSenha(e.target.value)}
/>

<button onClick={logar}>
Entrar
</button>

<p>

Não tem conta?

<span onClick={()=>mudarTela("cadastro")}>
 Criar conta
</span>

</p>

</div>

</div>

)

}