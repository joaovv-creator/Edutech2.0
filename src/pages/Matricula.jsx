import { supabase } from "../services/supabase"
import Swal from "sweetalert2"
import "./Matricula.css"

export default function Matricula({ usuario,curso,setTela }){

async function matricular(){
    const { data: existente } = await supabase
    .from("matriculas")
    .select("*")
    .eq("usuario_id", usuario.id)
    .eq("curso_id", cursoId)
    .single();

  if (existente) {
    alert("Você já está inscrito neste curso!");
    return;
  }

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

<div className="confirmar-cancelar-button">
<button onClick={matricular}>
Confirmar matrícula
</button>

<button onClick={()=>setTela("cursos")}>
Cancelar
</button>
</div>

</div>

</div>

)

}