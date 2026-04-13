import { useEffect, useState, useRef } from "react";
import { supabase } from "../services/supabase"
import "./Cursos.css"

export default function MeusCursos({ usuario,setTela,sair }){
    const [cursos,setCursos] = useState([])

const [cursoSelecionado, setCursoSelecionado] = useState(null);

const modalRef = useRef();

useEffect(() => {
  function handleClickFora(event) {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      setCursoSelecionado(null); // Fecha o modal
    }
  }

  if (cursoSelecionado) {
    document.addEventListener("mousedown", handleClickFora);
  }

  return () => {
    document.removeEventListener("mousedown", handleClickFora);
  };
}, [cursoSelecionado]);


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

<button 
  className="btn-acessar" 
  onClick={() => setCursoSelecionado(curso)} 
>
  Acessar curso
</button>

</div>

))}

</div>
{cursoSelecionado && (
  <div style={styles.overlay}>
    <div ref={modalRef} style={styles.modal}>
      {/* Usando os nomes exatos das colunas da sua imagem do Supabase */}
      <h2 style={{color: '#4A47E0'}}>{cursoSelecionado.nome}</h2>
      <p><strong>Professor:</strong> {cursoSelecionado.professor}</p>
      <p><strong>Carga:</strong> {cursoSelecionado.carga_horaria}</p>
      <hr />
      <p>{cursoSelecionado.descricao}</p>
      
      <button 
        onClick={() => setCursoSelecionado(null)}
        style={styles.botaoFechar}
      >
        Fechar
      </button>
    </div>
  </div>
)}
</div>

)

}
// const styles = {
//   overlay: {
//     position: 'fixed',
//     top: 0, left: 0, right: 0, bottom: 0,
//     backgroundColor: 'rgba(0, 0, 0, 0.7)',
//     display: 'flex',
//     justifyContent: 'center',
//     alignItems: 'center',
//     zIndex: 1000
//   },
//   modal: {
//     backgroundColor: 'white',
//     padding: '20px',
//     borderRadius: '8px',
//     width: '400px',
//     boxShadow: '0 4px 15px rgba(0,0,0,0.3)',
//     position: 'relative'
//   },
//   botaoFechar: {
//     marginTop: '15px',
//     backgroundColor: '#4A47E0',
//     color: 'white',
//     border: 'none',
//     padding: '8px 16px',
//     borderRadius: '4px',
//     cursor: 'pointer'
//   }
// };
const styles = {
  overlay: {
    position: 'fixed',
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 9999 // Garante que fica por cima de tudo
  },
  modal: {
    backgroundColor: 'white',
    padding: '30px',
    borderRadius: '12px',
    width: '90%',
    maxWidth: '500px',
    boxShadow: '0 10px 25px rgba(0,0,0,0.5)',
    textAlign: 'left',
    color: '#333'
  },
  botaoFechar: {
    marginTop: '20px',
    backgroundColor: '#4A47E0',
    color: 'white',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '6px',
    cursor: 'pointer',
    width: '100%'
  }
};