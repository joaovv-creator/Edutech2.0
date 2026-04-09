import { useState } from "react"
import { supabase } from "../services/supabase"
import Swal from "sweetalert2"


export default function Login({ mudarTela,setUsuario }){

const [email,setEmail] = useState("")
const [senha,setSenha] = useState("")

async function logar(){

if(!email || !senha){

Swal.fire({
icon:"warning",
title:"Preencha todos os campos"
})

return

}

const { data,error } = await supabase
.from("usuarios")
.select("*")
.eq("email",email)
.eq("senha",senha)
.single()

if(error){

Swal.fire({
icon:"error",
title:"Email ou senha inválidos"
})

return

}

setUsuario(data)

Swal.fire({
icon:"success",
title:"Login realizado com sucesso!",
timer:1500,
showConfirmButton:false
})

if(data.tipo_usuario === "admin"){

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
placeholder="Senha"
type="password"
value={senha}
onChange={(e)=>setSenha(e.target.value)}
/>

<button onClick={logar}>
Entrar
</button>

<p className="link-cadastro">

Não tem conta?

<a
className="cadastro-link"
onClick={()=>mudarTela("cadastro")}
>

Criar conta

</a>

</p>

</div>

</div>

)

}