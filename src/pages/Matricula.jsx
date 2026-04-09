import { supabase } from "../services/supabase"
import Swal from "sweetalert2"

export default function Matricula({ usuario,curso,setTela }){

async function matricular(){

const { error } = await supabase
.from("matriculas")
.insert([
{
usuario_id:usuario.id,
curso_id:curso.id
}
])

if(error){

Swal.fire({
icon:"error",
title:"Erro ao realizar matrícula"
})

return

}

Swal.fire({
icon:"success",
title:"Matrícula realizada com sucesso!"
})

setTela("meusCursos")

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