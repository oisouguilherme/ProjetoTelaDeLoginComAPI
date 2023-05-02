import { useState } from 'react';

const Cadastro = () => {
  const [nome, setNome] = useState('');
  const [cnpj, setCnpj] = useState('');
  const [loading, setLoading] = useState(false);

  const handleCadastro = async () => {
    setLoading(true);

    const token = localStorage.getItem('token');
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    };

    if (!cnpj || !nome) {
      alert('Por favor, preencha todos os campo CNPJ');
      setLoading(false);
      return;
    }
    const data = {
      nome,
      cnpj,
      idempresa: 1,
      criadoem: new Date().toISOString(),
      atualizadoem: new Date().toISOString(),
    };

    const response = await fetch('https://m2devadmin.softkuka.com.br/api/Vendedor', {
      method: 'POST',
      headers,
      body: JSON.stringify(data),
    });

    if (response.ok) {
      alert("Cadastro realizado com sucesso!");
    } else {
      alert("Erro ao realizar cadastro");
    }
    setLoading(false);
  };

  return (
    <div className='border w-full lg:w-1/3 p-12'>
      <h1 className='text-3xl text-center pb-12 font-bold'>Cadastro</h1>
      <form className='flex flex-col space-y-8'>
        <label className='flex flex-col'>
          Nome:
          <input 
          className='bg-gray-400 p-2 rounded-md' 
          type="text" 
          value={nome} 
          onChange={(e) => 
          setNome(e.target.value)} />
        </label>
        <label className='flex flex-col'>
          CNPJ:
          <input 
          className='bg-gray-400 p-2 rounded-md' 
          type="text" 
          required="true"
          value={cnpj} 
          onChange={(e) => 
          setCnpj(e.target.value)} />
        </label>
        <button className='bg-gray-500 font-medium text-xl py-2 w-1/2 mx-auto hover:bg-gray-600' onClick={handleCadastro} disabled={loading}>
          {loading ? 'Enviando...' : 'Enviar'}
        </button>
      </form>
    </div>
  );
};

export default Cadastro;
