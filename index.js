const { utils, ethers } = require("ethers");
const dotenv = require("dotenv");
dotenv.config();

const main = async () => {
  const provider = new ethers.providers.JsonRpcProvider(
    process.env.JSON_RPC_RELAY_URL
  );
  const signer = new ethers.Wallet(process.env.ETH_PRIVATE_KEY, provider);
  console.log("Address", signer.address);
  let balance = await provider.getBalance(signer.address);
  console.log("Account balance", ethers.utils.formatEther(balance), "Hbar");

  let receiverAddress = "0xB2576Fd98B4b717ecf9DC5C9901Cd839860e26EC";
  // Ether amount to send
  let amountInHbar = "1"; // 1 hbar
  // Create a transaction object
  // console.log(ethers.utils.parseEther(amountInHbar).toString());
  let tx = {
    to: receiverAddress,
    // 1 hbar = 1 eth
    // 1 hbar = 100_000_000 tiny hbar
    // 1 tiny hbar = 10_000_000 wei
    // 1 eth = 1_000_000_000_000_000_000 wei
    // You cannot transfer anything less then 1 tiny hbar or 10_000_000 wei
    value: ethers.utils.parseEther(amountInHbar),
  };
  // Send a transaction
  const submittedTx = await signer.sendTransaction(tx);
  const receipt = await submittedTx.wait();
  console.log("receipt", receipt);

  balance = await provider.getBalance(signer.address);
  console.log("Account balance", ethers.utils.formatEther(balance), "Hbar");
};

main();
