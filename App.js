import './App.css';
import { useEffect, useState } from "react";
import logo from './assets/logo.svg';
import info from './assets/info.png';
import file from './assets/file.png';

/*  
      {metas.map((meta) => (
        <li key={meta._id}>
          Gerente: {meta.idGerente} | Valor: {meta.valorMeta} | Tipo: {meta.tipoMeta}
        </li>
      ))}
  ); */




function App() {

 const [metas, setMetas] = useState([]);

useEffect(() => {
  const buscarMetas = async () => {
    try {
      const res = await fetch("http://localhost:8080/metas");
      const data = await res.json();   // converte para JSON
      console.log("Resposta da API:", data); // aqui já deve aparecer o array
      setMetas(data); // salva no estado
    } catch (err) {
      console.error("Erro ao buscar metas:", err);
    }
  };

  buscarMetas();

  


}, []);

  const [dragging, setDragging] = useState(false);
  const [fileName, setFileName] = useState("");

  const handleDrop = async (e) => {
    e.preventDefault();
    setDragging(false);

    const file = e.dataTransfer.files[0];
    if (!file) return;

    setFileName(file.name);

    // envia pro backend Node (ex: /upload)
    const formData = new FormData();
    formData.append("file", file);

    await fetch("http://localhost:8080/metas/planilha", {
      method: "POST",
      body: formData,
    });
  };


    const [formData, setFormData] = useState({
    idGerente: "",
    valorMeta: "",
    tipoMeta: "",
  });


  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit =  (e) => {
    e.preventDefault();

    console.log(formData);

    fetch('http://localhost:8080/metas', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData) })
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);
        setFormData({ idGerente: "", valorMeta: "", tipoMeta: "" });
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }

  return (
  <div className='h-screen'>
    <nav className='bg-primary flex justify-around items-center p-5'>
      <img className='size-12' src={logo} alt="Logo HPL"/>
      <ul className='flex gap-4 items-center'>
        <li className= 'bg-button text-primary hover:brightness-110 p-1 rounded-lg font-bold  text-xl text-center cursor-pointer w-[100px]'><a href="https://github.com/Helenapl145" target="_blank" rel="noopener noreferrer">Github</a></li>
        <li className= 'bg-button text-primary hover:brightness-110 p-1 rounded-lg font-bold text-xl text-center cursor-pointer w-[100px]'><a href="https://www.linkedin.com/feed/" target="_blank" rel="noopener noreferrer">Linkedin</a></li>
       </ul> 
    </nav>
    <h1 className='text-primary font-bold text-center p-2 text-5xl'>Registrador de  Metas</h1>
    <main className='flex flex-direction flex-row gap-4 align-center items-center justify-center h-[80vh]'>
      <section className='bg-secondary w-[600px] h-[400px] p-4 rounded-lg' >
        <form className='flex flex-direction flex-col gap-2' onSubmit={handleSubmit}>
          <h2 className='text-center font-bold text-black text-5xl mb-5'>Cadastro</h2>
          <div className='flex flex-direction flex-col gap-1'>
            <label className='text-[1rem] font-light' htmlFor="gerente">Codigo Gerente:</label>
            <input className='bg-white bg-opacity-65 rounded-sm h-[30px]' type="text" id="gerente" name="idGerente" value={formData.idGerente} onChange={handleChange}/>
          </div>

           <div  className='flex flex-direction flex-col'>
            <label className='text-[1rem] font-light' htmlFor="valor">Valor:</label>
            <input className='bg-white bg-opacity-65 rounded-sm h-[30px]' type="number" id="valor" name="valorMeta" value={formData.valorMeta} onChange={handleChange}/>
          </div>

           <div  className='flex flex-direction flex-col'>
            <label className='text-[1rem] font-light' htmlFor="tipo">Tipo da meta:</label>
            <input className='bg-white bg-opacity-65 rounded-sm h-[30px]' type="text" id="tipo" name="tipoMeta" value={formData.tipoMeta} onChange={handleChange}/>
          </div>

          <button className='bg-primary text-white text-md rounded-md mt-5 text-center h-[30px] hover:brightness-110' type="submit">Enviar</button>
        </form>
      </section>
      <span className='flex items-center font-bold text-black text-3xl' >OU</span>
     <section className="bg-secondary w-[600px] h-[400px] p-4 rounded-lg">
      <form className="flex flex-col gap-1 relative items-center justify-center">
        <h2 className="text-center font-bold text-black text-5xl mb-5">Planilha</h2>

        <div className="w-full flex flex-col items-center justify-center text-center gap-1">
          {/* Dropzone */}
          <div
            className={`flex flex-col items-center justify-center w-full h-40 rounded-lg cursor-pointer transition ${
              dragging ? "bg-blue-50" : "bg-area bg-opacity-50"
            }`}
            onDragOver={(e) => {
              e.preventDefault();
              setDragging(true);
            }}
            onDragLeave={() => setDragging(false)}
            onDrop={handleDrop}
          >
            <img className="size-14 mb-2" src={file} alt="Logo file" />
            <p className="text-[1rem] text-gray-600">
              {fileName || "Arraste sua planilha aqui"}
            </p>
          </div>

          <span className="flex items-center font-bold text-black text-[1rem] justify-center m-1 ">
            OU
          </span>

          {/* Upload manual */}
          <label
            htmlFor="file-upload"
            className="cursor-pointer p-1 bg-button text-black rounded-lg shadow-md text-[1rem] w-1/2 hover:brightness-110"
          >
            Escolha o arquivo
          </label>
          <input
            id="file-upload"
            type="file"
            className="hidden"
            onChange={async (e) => {
              const file = e.target.files[0];
              if (!file) return;

              setFileName(file.name);

              const formData = new FormData();
              formData.append("file", file);

              await fetch("http://localhost:8080/metas/planilha", {
                method: "POST",
                body: formData,
              });
            }}
          />
        </div>

        <button className='bg-primary text-white text-md rounded-md mt-7 text-center w-full h-[30px] hover:brightness-110' type="submit">Enviar</button>
      </form>
    </section>
    </main>


    <footer className='fixed bg-primary text-white text-center w-screen  bottom-0 text-[1rem] p-2'>
      <p><a href="https://github.com/Helenapl145" target="_blank" rel="noopener noreferrer">Helena Lima</a> © 2025</p>
    </footer>
  </div>
);


}

export default App;
