// scripts/deployChallenges.js

async function main() {
  const { ethers } = require("hardhat");

  // Dirección del contrato MayanNFT desplegado
  const nftAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

  // Obtener el contrato MayanChallenges
  const MayanChallenges = await ethers.getContractFactory("MayanChallenges");

  // Obtener la instancia del contrato MayanChallenges
  const challengesContract = await MayanChallenges.deploy(nftAddress);

  // Esperar a que se complete el despliegue
  await challengesContract.waitForDeployment();

  // Imprimir la dirección del contrato desplegado
  console.log("MayanChallenges contract deployed to:", await challengesContract.getAddress());
}

// Ejecutar la función principal y manejar errores
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

  
  
