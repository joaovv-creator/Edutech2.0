import { useEffect,useState } from "react"
import { supabase } from "../services/supabase"
import "./Cursos.css"

export default function Cursos({ usuario,setTela,setCursoSelecionado,sair }){

const [cursos,setCursos] = useState([])

useEffect(()=>{

buscarCursos()

},[])

async function buscarCursos(){

const { data } = await supabase
.from("cursos")
.select("*")

setCursos(data)

}

return(

<div>

<div className="navbar">

<div className="logo">
EduTech Cursos Online
</div>

<div className="nav-links">

<button onClick={()=>setTela("cursos")}>
Cursos
</button>

<button onClick={()=>setTela("meusCursos")}>
Meus Cursos
</button>

{usuario.admin &&(

<button onClick={()=>setTela("admin")}>
Admin
</button>

)}
<button onClick={sair}>
Sair
</button>
</div>

<span>
Bem-vindo(a), {usuario.nome}
</span>





</div>


<div className="grid">

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

<button
className="btn-curso"
onClick={()=>{

setCursoSelecionado(curso)
setTela("matricula")

}}
>

Entrar no curso

</button>

</div>

))}

</div>

</div>

)

}