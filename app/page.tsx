import dynamic from "next/dynamic";

const ContractData = dynamic(() => import("../components/ContractData"), {
  ssr: false,
});

const page = () => {
  return <ContractData />;
};

export default page;
