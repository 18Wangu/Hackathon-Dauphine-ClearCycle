// pages/dashboard.tsx

import React from 'react';

const Dashboard = () => {
  const data = [
    { id: '001', type: 'Bois', weight: '100 kg', date: '20/09/2024', status: 'created' },
    { id: '002', type: 'Plastique', weight: '200 kg', date: '21/09/2024', status: 'in-transport' },
    { id: '003', type: 'Métal', weight: '300 kg', date: '22/09/2024', status: 'arrived' },
  ];

  const statusClasses = (status: string) => {
    switch (status) {
      case 'created':
        return 'bg-red-500 text-white';
      case 'in-transport':
        return 'bg-orange-500 text-white';
      case 'arrived':
        return 'bg-green-500 text-white';
      default:
        return '';
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Tableau de bord de gestion des déchets</h1>

      <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
        <thead>
          <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
            <th className="py-3 px-6 text-left">ID du lot</th>
            <th className="py-3 px-6 text-left">Type de déchet</th>
            <th className="py-3 px-6 text-left">Poids</th>
            <th className="py-3 px-6 text-left">Date d’ajout</th>
            <th className="py-3 px-6 text-left">Statut actuel</th>
            <th className="py-3 px-6 text-left">Transactions blockchain</th>
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
                  {item.status === 'created' && 'Créé'}
                  {item.status === 'in-transport' && 'En transport'}
                  {item.status === 'arrived' && 'Arrivé'}
                </span>
              </td>
              <td className="py-3 px-6">
                <a href="#" className="text-blue-500 hover:underline">🔗</a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;
