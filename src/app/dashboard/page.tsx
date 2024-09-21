"use client";

import React, { useState } from 'react';
import Link from 'next/link';

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
  const [data, setData] = useState<DataItem[]>([
    { id: '001', type: 'Bois', weight: '100 kg', date: '10/08/2024', status: 'depart-entreprise', transaction: '0x2324ed720d761' },
    { id: '002', type: 'Plastique', weight: '200 kg', date: '15/09/2024', status: 'en-transport', transaction: '0x2ab965f727ade' },
    { id: '003', type: 'Métal', weight: '300 kg', date: '16/09/2024', status: 'centre-de-tri', transaction: '0xaa541d479321f' },
    { id: '004', type: 'Bois', weight: '250 kg', date: '16/09/2024', status: 'incineration', transaction: '0x4bfe0796267ee' },
  ]);

  const [expandedRows, setExpandedRows] = useState<string[]>([]);

  const toggleRowExpansion = (id: string) => {
    setExpandedRows((prevExpandedRows) =>
      prevExpandedRows.includes(id)
        ? prevExpandedRows.filter((rowId) => rowId !== id)
        : [...prevExpandedRows, id]
    );
  };

  const handleAddRow = () => {
    const newRow = {
      id: generateNextId(),
      type: '',
      weight: '',
      date: getCurrentDate(),
      status: 'depart-entreprise',
      transaction: generateTransaction(),
    };
    setData([...data, newRow]);
  };

  const generateNextId = () => {
    const lastId = data.length > 0 ? parseInt(data[data.length - 1].id) : 0;
    return (lastId + 1).toString().padStart(3, '0');
  };

  const generateTransaction = () => {
    return '0x' + Math.floor(Math.random() * 0xfffffffffffff).toString(16);
  };

  const getCurrentDate = () => {
    const today = new Date();
    return today.toLocaleDateString('fr-FR');
  };

  const handleInputChange = (index: number, field: string, value: string) => {
    const updatedData = [...data];
    updatedData[index][field] = value;
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

  const getProgressBarStatus = (status: string) => {
    switch (status) {
      case 'depart-entreprise':
        return 1;
      case 'en-transport':
        return 2;
      case 'centre-de-tri':
        return 3;
      case 'incineration':
        return 4;
      default:
        return 0;
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="flex items-center mb-5">
        <span className="text-3xl">♻️</span>
        <h1 className="text-3xl font-bold text-gray-800 mr-7">Coca</h1>
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
            <th className="py-3 px-6 text-left text-3xl hover:text-blue-500 hover:cursor-pointer" onClick={handleAddRow}>
              +
            </th>
          </tr>
        </thead>
        <tbody className="text-gray-600 text-sm">
          {data.map((item, index) => (
            <>
              <tr
                key={item.id}
                className="border-b border-gray-200 hover:bg-gray-100 cursor-pointer"
                onClick={() => toggleRowExpansion(item.id)}
              >
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
                <td>
                  <Link 
                    href="/qrcode"
                    className="text-3xl hover:cursor-pointer"
                  >
                    🖨️
                  </Link>
                </td>
              </tr>

              {/* Accordéon */}
              {expandedRows.includes(item.id) && (
                <tr>
                  <td colSpan={7} className="p-4 bg-gray-50">
                    <div className="flex items-center justify-center">
                      <div className="flex w-full max-w-xl items-center">
                        {/* Étape 1 */}
                        <div className={`relative w-1/3 text-center ${getProgressBarStatus(item.status) >= 1 ? 'text-blue-500' : 'text-gray-300'}`}>
                          <div className="relative z-10 rounded-full w-8 h-8 bg-current mx-auto mb-2"></div> {/* Cercle */}
                          <div className="relative inline-block group">
                              <span className="text-3xl cursor-pointer">🏭</span>
                              <div className="tooltip tooltip-content top-full left-1/2 transform translate-x-1/3">
                                  <p><strong>Nom de l'entreprise :</strong> Coca</p>
                                  <p><strong>Date et Heure :</strong> 2024-09-15 15:00</p>
                                  <p><strong>ID TX Blockchain :</strong> 0x123abc456def7890</p>
                              </div>
                          </div>
                          <div className={`absolute z-0 w-full h-1 top-3 -right-20 ${getProgressBarStatus(item.status) >= 2 ? 'bg-blue-500' : 'bg-gray-300'}`}></div> {/* Barre */}
                        </div>

                        {/* Étape 2 */}
                        <div className={`relative w-1/3 text-center ${getProgressBarStatus(item.status) >= 2 ? 'text-orange-500' : 'text-gray-300'}`}>
                          <div className="relative z-10 rounded-full w-8 h-8 bg-current mx-auto mb-2"></div> {/* Cercle */}
                          <div className="relative inline-block group">
                              <span className="text-3xl cursor-pointer">🚢</span>
                              <div className="tooltip tooltip-content top-full left-1/2 transform translate-x-1/3">
                                  <p><strong>Nom de l'entreprise :</strong> TransportEx</p>
                                  <p><strong>Date et Heure :</strong> 2024-09-21 15:00</p>
                                  <p><strong>ID TX Blockchain :</strong> 0x123abc456def7890</p>
                              </div>
                          </div>
                          <div className={`absolute z-0 w-full h-1 top-3 -right-20 ${getProgressBarStatus(item.status) >= 3 || getProgressBarStatus(item.status) === 4 ? 'bg-orange-500' : 'bg-gray-300'}`}></div> {/* Barre */}
                        </div>

                        {/* Étape 3 */}
                        <div className={`relative w-1/3 text-center ${getProgressBarStatus(item.status) === 3 ? 'text-green-500' : getProgressBarStatus(item.status) === 4 ? 'text-red-500' : 'text-gray-300'}`}>
                          <div className="relative z-10 rounded-full w-8 h-8 bg-current mx-auto mb-2"></div> {/* Cercle */}
                          <div className="relative inline-block group">
                            <span className="text-3xl cursor-pointer">
                              {getProgressBarStatus(item.status) === 3 ? '♻️' : getProgressBarStatus(item.status) === 4 ? '🔥' : ''}
                            </span>
                            <div className="tooltip tooltip-content top-full left-1/2 transform translate-x-1/3 z-100">
                              {getProgressBarStatus(item.status) === 3 ? (
                                <>
                                  <p><strong>Nom de l'entreprise :</strong> Recyclage Angers</p>
                                  <p><strong>Date et Heure :</strong> 2024-09-19 18:00</p>
                                  <p><strong>ID TX Blockchain :</strong> 0x123abc456def7890</p>
                                </>
                              ) : getProgressBarStatus(item.status) === 4 ? (
                                <>
                                  <p><strong>Nom de l'entreprise :</strong> Incinération Rennes</p>
                                  <p><strong>Date et Heure :</strong> 2024-09-21 16:00</p>
                                  <p><strong>ID TX Blockchain :</strong> 0x789xyz123abc4560</p>
                                </>
                              ) : null}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </td>
                </tr>
              )}
            </>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;
