import { useEffect, useState } from "react"
import { supabase } from "../services/supabase"
import Swal from "sweetalert2"
import "./Cursos.css"

export default function Admin({ usuario, setTela, sair }) {

  const [nome, setNome] = useState("")
  const [descricao, setDescricao] = useState("")
  const [carga_horaria, setCargaHoraria] = useState("")
  const [professor, setProfessor] = useState("")

  const [cursos, setCursos] = useState([])
  const [usuarios, setUsuarios] = useState([])

  useEffect(() => {
    buscarCursos()
    buscarUsuarios()
  }, [])

  async function buscarCursos() {
    const { data } = await supabase
      .from("cursos")
      .select("*")

    setCursos(data || [])
  }

  async function buscarUsuarios() {
    const { data } = await supabase
      .from("usuarios")
      .select(`
        id,
        nome,
        email,
        matriculas(
          cursos(nome)
        )
      `)

    setUsuarios(data || [])
  }

  async function adicionarCurso() {

    if (!nome || !descricao) {
      Swal.fire({
        icon: "warning",
        title: "Preencha os campos"
      })
      return
    }

    const { error } = await supabase
      .from("cursos")
      .insert([
        { nome, descricao, carga_horaria, professor }
      ])

    if (error) {
      Swal.fire({
        icon: "error",
        title: "Erro ao criar curso"
      })
      return
    }

    Swal.fire({
      icon: "success",
      title: "Curso criado com sucesso!"
    })

    setNome("")
    setDescricao("")
    setCargaHoraria("")
    setProfessor("")

    buscarCursos()
  }

  async function excluirCurso(id) {

    const confirmar = await Swal.fire({
      title: "Deseja excluir o curso?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sim",
      cancelButtonText: "Cancelar"
    })

    if (confirmar.isConfirmed) {

      await supabase
        .from("cursos")
        .delete()
        .eq("id", id)

      Swal.fire({
        icon: "success",
        title: "Curso excluído"
      })

      buscarCursos()
    }
  }

  return (

    <div>

      {/* 🔥 NAVBAR ORIGINAL — NÃO ALTERADA */}
      <div className="navbar">

        <div className="logo">
          Painel Admin
        </div>

        <div className="nav-links">

          <a className="nav-link" onClick={() => setTela("cursos")}>
            Cursos
          </a>

          <a className="nav-link" onClick={() => setTela("meusCursos")}>
            Meus Cursos
          </a>

        </div>

        <a className="logout-link" onClick={sair}>
          Sair
        </a>

      </div>


      {/* 🔽 CONTEÚDO (ARRUMADO) */}
      <div className="admin-container">

        {/* FORMULÁRIO */}
        <div className="curso-form-container">
          <div className="curso-form-box">

            <h2>Adicionar novo curso</h2>

            <input
              placeholder="Nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />

            <input
              placeholder="Descrição"
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
            />

            <input
              placeholder="Carga horária"
              value={carga_horaria}
              onChange={(e) => setCargaHoraria(e.target.value)}
            />

            <input
              placeholder="Professor"
              value={professor}
              onChange={(e) => setProfessor(e.target.value)}
            />

            <button className="form-btn" onClick={adicionarCurso}>
              Adicionar Curso
            </button>

          </div>
        </div>


        {/* CURSOS */}
        <div className="admin-section">
          <h2>Excluir cursos</h2>

          {cursos.map(curso => (
           <div key={curso.id} className="curso-item">
  <div className="curso-info">
    {curso.nome}
  </div>

  <button
    className="delete-btn"
    onClick={() => excluirCurso(curso.id)}
  >
    Excluir
  </button>
</div>
          ))}
        </div>


        {/* USUÁRIOS */}
        <div className="admin-section">
          <h2>Usuários cadastrados e cursos matriculados</h2>

          {usuarios.map(user => (
            <div key={user.id} className="user-card">

              <strong>{user.nome}</strong>

              <p>Email: {user.email}</p>

              <p>
                Cursos:
                {user.matriculas.length === 0
                  ? " Nenhum curso"
                  : user.matriculas.map((mat, index) => (
                      <span key={index}> {mat.cursos.nome}</span>
                    ))
                }
              </p>

            </div>
          ))}
        </div>

      </div>

    </div>
  )
}