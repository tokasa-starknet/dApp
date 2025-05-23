import {
  deployContract,
  executeDeployCalls,
  exportDeployments,
  deployer,
} from "./deploy-contract";
import { green } from "./helpers/colorize-log";

/**
 * Deploy a contract using the specified parameters.
 *
 * @example (deploy contract with constructorArgs)
 * const deployScript = async (): Promise<void> => {
 *   await deployContract(
 *     {
 *       contract: "YourContract",
 *       contractName: "YourContractExportName",
 *       constructorArgs: {
 *         owner: deployer.address,
 *       },
 *       options: {
 *         maxFee: BigInt(1000000000000)
 *       }
 *     }
 *   );
 * };
 *
 * @example (deploy contract without constructorArgs)
 * const deployScript = async (): Promise<void> => {
 *   await deployContract(
 *     {
 *       contract: "YourContract",
 *       contractName: "YourContractExportName",
 *       options: {
 *         maxFee: BigInt(1000000000000)
 *       }
 *     }
 *   );
 * };
 *
 *
 * @returns {Promise<void>}
 */
const deployScript = async (): Promise<void> => {
  await deployContract({
    contract: "YourContract",
    constructorArgs: {
      owner: deployer.address,
    },
    
  });
  await deployContract({
    contract: "host",
    constructorArgs: {
      owner: deployer.address,
    },
  });

  await deployContract({
    contract: "property",
    constructorArgs: {
      owner: deployer.address,
    },
  });

  const erc1155AddressDeploymentResult = await deployContract({
    contract: "ToKasaFractionalAssets",
    constructorArgs: {
      default_admin: deployer.address,
      pauser: deployer.address,
      minter: deployer.address,
      uri_setter: deployer.address,
      upgrader: deployer.address,
      default_royalty_receiver: deployer.address,
      royalty_admin: deployer.address
    },
  });

  const erc1155Address = erc1155AddressDeploymentResult.address;

const kasaSaleDeploymentResult = await deployContract({
  contract: "kasaSale",
  constructorArgs: {
    owner: deployer.address,
    tokasa_contract: erc1155Address,
  },
});

const kasaSaleAddress = kasaSaleDeploymentResult.address;
console.log(green(`KasaSale contract deployed at address: ${kasaSaleAddress}`));

};


const main = async (): Promise<void> => {
  try {
    await deployScript();
    await executeDeployCalls();
    exportDeployments();

    console.log(green("All Setup Done!"));
  } catch (err) {
    console.log(err);
    process.exit(1); //exit with error so that non subsequent scripts are run
  }
};

main();
