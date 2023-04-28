"use client";
import { useEffect, useState } from "react";
import { getCount, resetCount, incrementCount } from "./fetchData";
import dynamic from "next/dynamic";

import { ethers } from "ethers";

const ContractData = () => {
  const [data, setData] = useState(null);
  const [signer, setsigner] = useState(null);

  const getData = async () => {
    const countValue = await getCount();
    setData(countValue);
  };

  const writeContract = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);

    try {
      await provider.send("eth_requestAccounts", []);
      setsigner(provider.getSigner());
    } catch (error) {
      console.log(error);
    }
    console.log("signer value : ", signer);
  };
  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="flex flex-col w-[200px] justify-between h-[300px] m-auto mt-20">
      <button
        className="bg-black p-2 rounded-md text-white"
        onClick={() => writeContract()}
      >
        Connect Wallet
      </button>
      <h1 className="text-md font-medium text-blue-900">
        Decentralized Application
      </h1>
      <h1 className="text-3xl font-bold">Counter App</h1>
      <p className="border-2 border-gray-200 rounded-lg">
        {data ? <p>{data.toString()}</p> : <p>Loading data...</p>}
      </p>
      <button className="bg-slate-200 p-2 rounded-md" onClick={() => getData()}>
        Get Count
      </button>
      <button
        className={`bg-blue-300 p-2 rounded-md ${
          signer ? signer : "opacity-50 cursor-not-allowed"
        }`}
        onClick={() => {
          if (signer) incrementCount(signer);
        }}
        disabled={!signer}
      >
        Increment Count
      </button>
      <button
        className={`bg-red-300 p-2 rounded-md ${
          signer ? "" : "opacity-50 cursor-not-allowed"
        }`}
        onClick={() => {
          if (signer) resetCount(signer);
        }}
        disabled={!signer}
      >
        Reset Count
      </button>
    </div>
  );
};

export default ContractData;
