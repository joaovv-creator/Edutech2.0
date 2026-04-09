import { useState } from "react"
import { supabase } from "../services/supabase"
import Swal from "sweetalert2"

export default function Cadastro({ setUsuario }) {

const [nome,setNome]=useState("")
const [email,setEmail]=useState("")
const [senha,setSenha]=useState("")
const [telefone,setTelefone]=useState("")
const [cidade,setCidade]=useState("")

async function cadastrar(){

if(!nome || !email || !senha){

Swal.fire({
icon:"warning",
title:"Preencha todos os campos"
})

return

}

const { error } = await supabase
.from("usuarios")
.insert([
{
nome,
email,
senha,
admin:false
}
])

if(error){

Swal.fire({
icon:"error",
title:"Erro ao cadastrar usuário"
})

return

}

Swal.fire({
icon:"success",
title:"Cadastro realizado com sucesso!"
})

mudarTela("login")

}

return(

<div className="container">

<div className="card-form">

<h1>Criar conta</h1>

<input placeholder="Nome completo"
onChange={(e)=>setNome(e.target.value)}
/>

<input placeholder="Email"
onChange={(e)=>setEmail(e.target.value)}
/>

<input placeholder="Senha"
type="password"
onChange={(e)=>setSenha(e.target.value)}
/>

<input placeholder="Telefone"
onChange={(e)=>setTelefone(e.target.value)}
/>

<input placeholder="Cidade"
onChange={(e)=>setCidade(e.target.value)}
/>

<br/>

<button onClick={cadastrar}>
Cadastrar
</button>

</div>

</div>

)

}