async function main() {
    // Usa la dirección del contrato MayanNFT que desplegaste
    const nftAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3"; // Cambia esto si no es la dirección correcta

    // Obtén el contrato usando ethers.js
    const MayanNFT = await ethers.getContractFactory("MayanNFT");
    const nftContract = MayanNFT.attach(nftAddress); // Conecta el contrato a esa dirección

    console.log("MayanNFT contract is deployed at:", nftContract.address);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
