import { supabase } from "../services/supabase"

export default function Matricula({ usuario,curso,setTela }){

async function matricular(){

const { error } = await supabase
.from("matriculas")
.insert([{

usuario_id: usuario.id,
curso_id: curso.id

}])

if(error){

alert("Erro ao matricular")

}else{

alert("Matriculado com sucesso!")

setTela("cursos")

}

}

return(

<div className="container">

<div className="card-form">

<h2>Matrícula</h2>

<p>Curso: {curso.nome}</p>

<p>Aluno: {usuario.nome}</p>

<button onClick={matricular}>
Confirmar matrícula
</button>

<button onClick={()=>setTela("cursos")}>
Cancelar
</button>

</div>

</div>

)

}