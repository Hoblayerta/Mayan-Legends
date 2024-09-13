async function main() {
  // Importar ethers desde hardhat
  const { ethers } = require("hardhat");

  // Obtener el contrato MayanNFT
  const MayanNFT = await ethers.getContractFactory("MayanNFT");

  // Desplegar el contrato
  const nftContract = await MayanNFT.deploy();

  // Esperar a que se complete el despliegue
  await nftContract.waitForDeployment();

  // Imprimir la dirección del contrato desplegado
  console.log("MayanNFT contract deployed to:", await nftContract.getAddress());
}

// Ejecutar la función principal y manejar errores
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

