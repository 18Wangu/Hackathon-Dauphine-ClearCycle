"use client";

import Link from "next/link";
import { useWalletAuth } from "../../modules/wallet/hooks/useWalletAuth";

const Login = () => {
  const { isConnected, connect, wallet } = useWalletAuth();
  
  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gray-100 p-4">
      <div className="bg-white shadow-lg rounded-lg p-2 max-w-96 w-11/12 sm:w-96">
        <h1 className="text-4xl font-semibold text-center text-blue-700 mb-8">Bienvenue</h1>
        {isConnected ? (
          <div className="text-center text-gray-700">
            <p className="mb-4">Vous êtes connecté avec :</p>
            <span className="font-medium text-sm text-center">{wallet?.getAddress()}</span>
            <Link 
              href="/dashboard"
              className="block bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200 mt-4">
                Dashboard
            </Link>
          </div>
        ) : (
          <button 
            onClick={connect} 
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200"
          >
            Inscription
          </button>
        )}
      </div>
    </div>
  );
};

export default Login;

/*
A FAIRE :
- Mettre logo ClearCylce
- Faire progress bar avec emoji et information sur le transporteur etc

*/