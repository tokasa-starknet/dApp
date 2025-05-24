import { useScaffoldWriteContract } from "../scaffold-stark/useScaffoldWriteContract";
import { cairo } from "starknet";

export const useKasaSale = () => {
  const { sendAsync: buyTokens } = useScaffoldWriteContract({
    contractName: "kasaSale",
    functionName: "buy",
    args: [0n],
  });

  const executeBuy = async (amount: number) => {
    try {
      console.log("amount", amount);
      // Convertir el amount a uint256 de Cairo
      const amountUint256 = cairo.uint256(amount);
      console.log("amountUint256", amountUint256);
      await buyTokens({ args: [amountUint256] });
      return true;
    } catch (error) {
      console.error("Error buying tokens:", error);
      return false;
    }
  };

  return {
    executeBuy,
  };
}; 