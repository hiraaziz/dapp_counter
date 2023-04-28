import { providers } from "ethers";
const { JsonRpcProvider } = providers;
import { ethers } from "ethers";
import { abi, contractAddress } from "./contractDetails";

export const fetchData = async (signer?: any) => {
  const provider = new JsonRpcProvider(
    "https://goerli.infura.io/v3/e8eefaee0630410ba792a72fadb9ae08"
  );
  try {
    let contractInstance: any;
    if (signer) {
      contractInstance = new ethers.Contract(contractAddress, abi, signer);
    } else {
      contractInstance = new ethers.Contract(contractAddress, abi, provider);
    }
    return contractInstance;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export async function getCount() {
  const contractInstance = await fetchData();
  const data = await contractInstance.getCount();
  return data;
}

export async function resetCount(signer: any) {
  const contractInstance = await fetchData(signer);
  await contractInstance.resetCount();
}

export async function incrementCount(signer: any) {
  const contractInstance = await fetchData(signer);
  await contractInstance.incrementCount();
}
