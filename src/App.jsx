import { useState } from "react";
import "./App.css";

function App() {
  const [tarefas, setTarefas] = useState([]);
  const [texto, setTexto] = useState("");
  const [data, setData] = useState("");

  const adicionarTarefa = (e) => {
    e.preventDefault();
    if (!texto) return;

    const novaTarefa = {
      id: Math.random(),
      texto: texto,
      data: data,
      editando: false,
      concluida: false
    };

    setTarefas([...tarefas, novaTarefa]);
    setTexto("");
    setData("");
  };

  const deletarTarefa = (id) => {
    const novasTarefas = tarefas.filter((t) => t.id !== id);
    setTarefas(novasTarefas);
  };

  const alternarConcluida = (id) => {
    const novasTarefas = tarefas.map((t) =>
      t.id === id ? { ...t, concluida: !t.concluida } : t
    );
    setTarefas(novasTarefas);
  };

  const alternarEdicao = (id) => {
    const novasTarefas = tarefas.map((t) =>
      t.id === id ? { ...t, editando: !t.editando } : t
    );
    setTarefas(novasTarefas);
  };

  const salvarEdicao = (id, novoTexto) => {
    const novasTarefas = tarefas.map((t) =>
      t.id === id ? { ...t, texto: novoTexto, editando: false } : t
    );
    setTarefas(novasTarefas);
  };

  return (
    <div className="container">
      <h1>Lista de Tarefas</h1>

      <form onSubmit={adicionarTarefa}>
        <input
          type="text"
          value={texto}
          onChange={(e) => setTexto(e.target.value)}
          placeholder="Digite sua tarefa"
        />

        <input
          type="date"
          value={data}
          onChange={(e) => setData(e.target.value)}
        />

        <button type="submit">Adicionar</button>
      </form>

      <ul className="voumimmatar"> 
        {tarefas.map((tarefa) => (
          <li key={tarefa.id} className={tarefa.concluida ? "concluida" : ""}>
            {tarefa.editando ? (
              <>
                <input
                  type="text"
                  id={`input-${tarefa.id}`}
                  defaultValue={tarefa.texto}
                />

                <button
                  onClick={() => {
                    const valorInput = document.getElementById(
                      `input-${tarefa.id}`
                    ).value;
                    salvarEdicao(tarefa.id, valorInput);
                  }}
                >
                  Salvar
                </button>
              </>
            ) : (
              <>
                <span>
                  {tarefa.texto} - {tarefa.data}
                </span>

                <div className="botoes">
                  <button onClick={() => alternarConcluida(tarefa.id)}>
                    ✓
                  </button>
                  <button onClick={() => alternarEdicao(tarefa.id)}>
                    Editar
                  </button>
                  <button onClick={() => deletarTarefa(tarefa.id)}>
                    🗑
                  </button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;