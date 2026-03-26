import { useState } from "react";
import "./App.css";

function App() {
  const [tarefas, setTarefas] = useState([]);
  const [texto, setTexto] = useState("");
  const [data, setData] = useState("");
  const [hora, setHora] = useState("");

  const adicionarTarefa = (e) => {
    e.preventDefault();
    if (!texto) return;

    const novaTarefa = {
      id: Math.random(),
      texto: texto,
      data: data,
      editando: false,
      concluida: false,
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
  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center p-6">
  <div className="w-full max-w-md bg-gray-800 p-6 rounded-2xl shadow-lg">
    
    <h1 className="text-2xl font-bold mb-4 text-center">
      Lista de Tarefas
    </h1>

    <form onSubmit={adicionarTarefa} className="flex flex-col gap-3 mb-4">
      <input
        type="text"
        value={texto}
        onChange={(e) => setTexto(e.target.value)}
        placeholder="Digite sua tarefa"
        className="p-2 rounded-lg bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <input
        type="date"
        value={data}
        onChange={(e) => setData(e.target.value)}
        className="p-2 rounded-lg bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input 
      type="time" 
      value={hora}
      onChange={(e) => setHora(e.target.value)}
      className="p-2 rounded-lg bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <button className="bg-blue-500 hover:bg-blue-600 transition p-2 rounded-lg font-semibold">
        Adicionar
      </button>
    </form>

    <ul className="space-y-2">
      {tarefas.map((tarefa) => (
        <li
          key={tarefa.id}
          className="flex justify-between items-center bg-gray-700 p-3 rounded-lg"
        >
          <span>{tarefa.texto}</span>

          <div className="flex gap-2">
            <button
              onClick={() => alternarConcluida(tarefa.id)}
              className="bg-green-500 px-2 rounded"
            >
              ✓
            </button>

            <button
              onClick={() => deletarTarefa(tarefa.id)}
              className="bg-red-500 px-2 rounded"
            >
              🗑
            </button>
          </div>
        </li>
      ))}
    </ul>

  </div>
</div>
  );
}

export default App;