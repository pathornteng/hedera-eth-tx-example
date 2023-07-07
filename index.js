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
  let nonce = await provider.getTransactionCount(signer.address); // get nonce from the system
  console.log("Address nonce", nonce);

  let receiverAddress = "0x497eE4733Da289104B0816E3567A707927cbE112";
  // Ether amount to send
  let amountInHbar = "1"; // 1 hbar
  let gasPrice = "1820000000000"; // minimum gas price
  let gasLimit = "21000"; // minimum gas limit
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
    gasPrice: gasPrice,
    gasLimit: gasLimit,
    nonce: nonce,
    from: signer.address,
  };
  // Send a transaction
  const submittedTx = await signer.sendTransaction(tx);
  const receipt = await submittedTx.wait();
  console.log("receipt", receipt);

  balance = await provider.getBalance(signer.address);
  console.log("Account balance", ethers.utils.formatEther(balance), "Hbar");
};

main();
