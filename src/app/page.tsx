import React from 'react';
import Image from 'next/image';
import Image1 from '../public/coca.png';

const Dashboard = () => {
  const data = [
    { id: '001', type: 'Bois', weight: '100 kg', date: '20/09/2024', status: 'depart-entreprise', transaction: '0x123456789' },
    { id: '002', type: 'Plastique', weight: '200 kg', date: '21/09/2024', status: 'en-transport', transaction: '0x123896789' },
    { id: '003', type: 'Métal', weight: '300 kg', date: '22/09/2024', status: 'centre-de-tri', transaction: '0x998456789' },
    { id: '003', type: 'Métal', weight: '300 kg', date: '22/09/2024', status: 'incineration', transaction: '0x978477789' },
  ];

  const statusClasses = (status: string) => {
    switch (status) {
      case 'depart-entreprise':
        return 'bg-blue-500 text-white';
      case 'en-transport':
        return 'bg-orange-500 text-white';
      case 'centre-de-tri':
        return 'bg-green-500 text-white';
      case 'incineration':
        return 'bg-red-500 text-white';
      default:
        return '';
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className='flex items-center mb-5'>
        <h1 className="text-3xl font-bold text-gray-800 mr-7">Coca</h1>
        <Image
          src={Image1}
          alt="Coca"
          width={30}
          height={30}
        />
      </div>

      <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
        <thead>
          <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
            <th className="py-3 px-6 text-left">ID du lot</th>
            <th className="py-3 px-6 text-left">Type de déchet</th>
            <th className="py-3 px-6 text-left">Poids</th>
            <th className="py-3 px-6 text-left">Date d’ajout</th>
            <th className="py-3 px-6 text-left">Statut actuel</th>
            <th className="py-3 px-6 text-left">Transactions blockchain</th>
            <th className="py-3 px-6 text-left text-3xl hover:text-blue-500 hover:cursor-pointer">+</th>
          </tr>
        </thead>
        <tbody className="text-gray-600 text-sm">
          {data.map((item) => (
            <tr key={item.id} className="border-b border-gray-200 hover:bg-gray-100">
              <td className="py-3 px-6">{item.id}</td>
              <td className="py-3 px-6">{item.type}</td>
              <td className="py-3 px-6">{item.weight}</td>
              <td className="py-3 px-6">{item.date}</td>
              <td className="py-3 px-6">
                <span className={`py-1 px-3 rounded-full text-xs font-bold ${statusClasses(item.status)}`}>
                  {item.status === 'depart-entreprise' && 'Départ entreprise'}
                  {item.status === 'en-transport' && 'En transport'}
                  {item.status === 'centre-de-tri' && 'Centre de tri'}
                  {item.status === 'incineration' && 'Incinération'}
                </span>
              </td>
              <td className="py-3 px-6">
                <a href="#" className="hover:text-blue-500">🔗 {item.transaction}</a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;
