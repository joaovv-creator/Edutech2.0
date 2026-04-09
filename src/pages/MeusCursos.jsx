import { useEffect,useState } from "react"
import { supabase } from "../services/supabase"
import "./Cursos.css"

export default function MeusCursos({ usuario,setTela,sair }){

const [cursos,setCursos] = useState([])

useEffect(()=>{

buscarMeusCursos()

},[])

async function buscarMeusCursos(){

const { data } = await supabase
.from("matriculas")
.select("cursos(*)")
.eq("usuario_id",usuario.id)

if(data){

const lista = data.map(item => item.cursos)

setCursos(lista)

}

}

return(

<div>

<div className="navbar">

<div className="logo">
EduTech Cursos Online
</div>

<div className="nav-links">

<a className="nav-link" onClick={()=>setTela("cursos")}>
Cursos
</a>

<a className="nav-link" onClick={()=>setTela("meusCursos")}>
Meus Cursos
</a>

{usuario.tipo_usuario === "admin" && (

<a className="nav-link" onClick={()=>setTela("admin")}>
Admin
</a>

)}</div>
<a className="logout-link" onClick={sair}>
Sair
</a>







</div>


<div className="grid">

{cursos.length===0 &&(

<h2 style={{marginLeft:"40px"}}>
Você ainda não está matriculado em nenhum curso
</h2>

)}

{cursos.map(curso=> (

<div className="card" key={curso.id}>



<h2>{curso.nome}</h2>

<p>{curso.descricao}</p>

<p>
Professor: {curso.professor}
</p>

<p>
Carga: {curso.carga_horaria}
</p>

<button className="btn-curso">
Acessar curso
</button>

</div>

))}

</div>

</div>

)

}