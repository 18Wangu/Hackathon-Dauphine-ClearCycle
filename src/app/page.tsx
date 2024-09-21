"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import Image1 from '../public/coca.png';
import { useWalletAuth } from "../../modules/wallet/hooks/useWalletAuth";

interface DataItem {
  id: string;
  type: string;
  weight: string;
  date: string;
  status: string;
  transaction: string;
  [key: string]: string;
}

const Dashboard = () => {
  const { isConnected, connect, wallet } = useWalletAuth();
  const [data, setData] = useState<DataItem[]>([
    { id: '001', type: 'Bois', weight: '100 kg', date: '10/08/2024', status: 'depart-entreprise', transaction: '0x2324ed720d761' },
    { id: '002', type: 'Plastique', weight: '200 kg', date: '15/09/2024', status: 'en-transport', transaction: '0x2ab965f727ade' },
    { id: '003', type: 'Métal', weight: '300 kg', date: '16/09/2024', status: 'centre-de-tri', transaction: '0xaa541d479321f' },
    { id: '004', type: 'Bois', weight: '250 kg', date: '16/09/2024', status: 'incineration', transaction: '0x4bfe0796267ee' },
  ]);

  // Function to generate the next unique ID (auto-increment)
  const generateNextId = () => {
    const lastId = data.length > 0 ? parseInt(data[data.length - 1].id) : 0;
    return (lastId + 1).toString().padStart(3, '0');
  };

  // Function to generate a random transaction hash
  const generateTransaction = () => {
    return '0x' + Math.floor(Math.random() * 0xfffffffffffff).toString(16);
  };

  // Function to format today's date as 'DD/MM/YYYY'
  const getCurrentDate = () => {
    const today = new Date();
    return today.toLocaleDateString('fr-FR'); // Format date to 'DD/MM/YYYY'
  };

  // Handle add new row when "+" is clicked
  const handleAddRow = () => {
    const newRow = {
      id: generateNextId(),
      type: '', // User will input
      weight: '', // User will input
      date: getCurrentDate(),
      status: 'depart-entreprise',
      transaction: generateTransaction(),
    };
    setData([...data, newRow]);
  };

  // Handle input change for type and weight
  const handleInputChange = (index: number, field: string, value: string) => {
    const updatedData = [...data];
    updatedData[index][field] = value; // Now TypeScript will accept this
    setData(updatedData);
  };

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

      {/* <h2 className="text-2xl font-bold text-gray-800 mb-5">Tableau de bord</h2>
      {isConnected ? (
        <>{wallet?.getAddress()}</>
      ) : (
        <button onClick={connect} className='text-blue-600'>Connect Wallet</button>
      )} */}

      <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
        <thead>
          <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
            <th className="py-3 px-6 text-left">ID du lot</th>
            <th className="py-3 px-6 text-left">Type de déchet</th>
            <th className="py-3 px-6 text-left">Poids</th>
            <th className="py-3 px-6 text-left">Date d’ajout</th>
            <th className="py-3 px-6 text-left">Statut actuel</th>
            <th className="py-3 px-6 text-left">Transactions blockchain</th>
            <th className="py-3 px-6 text-left text-3xl hover:text-blue-500 hover:cursor-pointer" onClick={handleAddRow}>+</th>
          </tr>
        </thead>
        <tbody className="text-gray-600 text-sm">
          {data.map((item, index) => (
            <tr key={item.id} className="border-b border-gray-200 hover:bg-gray-100">
              <td className="py-3 px-6">{item.id}</td>
              <td className="py-3 px-6">
                <input
                  type="text"
                  value={item.type}
                  onChange={(e) => handleInputChange(index, 'type', e.target.value)}
                  className="border border-gray-300 rounded p-1"
                  placeholder="Type de déchet"
                />
              </td>
              <td className="py-3 px-6">
                <input
                  type="text"
                  value={item.weight}
                  onChange={(e) => handleInputChange(index, 'weight', e.target.value)}
                  className="border border-gray-300 rounded p-1"
                  placeholder="Poids"
                />
              </td>
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
