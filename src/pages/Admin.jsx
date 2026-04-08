import { useState } from "react"
import { supabase } from "../services/supabase"
import "./Admin.css"

export default function Admin({ usuario,setTela,sair }){

const [nome,setNome]=useState("")
const [descricao,setDescricao]=useState("")
const [carga,setCarga]=useState("")
const [professor,setProfessor]=useState("")
const [imagem,setImagem]=useState("")

async function cadastrarCurso(){

const { error } = await supabase
.from("cursos")
.insert([{

nome,
descricao,
carga_horaria:carga,
professor,
imagem

}])

if(error){

alert("Erro ao cadastrar")

}else{

alert("Curso cadastrado com sucesso")

setNome("")
setDescricao("")
setCarga("")
setProfessor("")
setImagem("")

}

}

return(

<div>

<div className="navbar">

<div className="logo">
Painel ADMIN
</div>

<div className="nav-links">

<button onClick={()=>setTela("cursos")}>
Cursos
</button>

<span>
Bem-vindo, {usuario.nome}
</span>

<button onClick={sair}>
Sair
</button>

</div>

</div>


<div className="admin-container">

<h2>Novo Curso</h2>

<input
placeholder="Nome"
value={nome}
onChange={(e)=>setNome(e.target.value)}
/>

<input
placeholder="Descrição"
value={descricao}
onChange={(e)=>setDescricao(e.target.value)}
/>

<input
placeholder="Carga horária"
value={carga}
onChange={(e)=>setCarga(e.target.value)}
/>

<input
placeholder="Professor"
value={professor}
onChange={(e)=>setProfessor(e.target.value)}
/>

<input
placeholder="Imagem URL"
value={imagem}
onChange={(e)=>setImagem(e.target.value)}
/>

<button onClick={cadastrarCurso}>
Cadastrar Curso
</button>

</div>

</div>

)

}