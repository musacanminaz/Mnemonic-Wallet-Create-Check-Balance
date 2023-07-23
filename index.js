const ethers = require('ethers');
const bip39 = require('bip39');

// Function Generate Addresses From Mnemonic and Check its balance
// For Every mnemonic generate 24 addresss
async function generateAddressesFromMnemonic(mnemonic) {
  if (!bip39.validateMnemonic(mnemonic)) {
    console.error('Invalid mnemonic');
    return;
  }

  const seed = await bip39.mnemonicToSeed(mnemonic);
  const hdNode = ethers.utils.HDNode.fromSeed(seed);
  const provider = new ethers.providers.JsonRpcProvider(
    'https://bsc-dataseed.binance.org/'
  );

  for (let i = 0; i < 24; i++) {
    const wallet = hdNode.derivePath(`m/44'/60'/0'/0/${i}`);
    const address = wallet.address;
    const privateKey = wallet.privateKey;

    try {
      const balance = await provider.getBalance(address);
      const balanceBNB = ethers.utils.formatEther(balance);
      console.log(`BNB Balance for address ${address}: ${balanceBNB} BNB`);
      console.log(`Address private key ${privateKey}`);
    } catch (error) {
      console.error('Error fetching balance:', error.message);
    }
  }
}

// test with this wallets
const mnemonicTest = [
  'spirit recipe joy novel wheat rapid helmet inhale shed random beach audit',
  'estate come eager ritual sorry major seat exact turtle gauge inside remind',
  'base expose kingdom rabbit leg real boy mirror crater wheel spawn main',
  'there runway urban exhaust seek course castle describe accident medal vehicle mushroom',
  'hood chest bird half minimum cat next pigeon easy dress balance drive',
  'joy excite shallow since until cliff prize fetch arm wheel thumb acquire',
  'good chef neck cloth elbow inherit lamp route stool rescue size void',
  'humble day know attack people exotic sock travel course guitar snack trick',
  'pave fox leopard today radio gauge diagram energy inner perfect wrist hint',
  'feel dolphin enemy drill tourist flower snack paper hawk convince riot hen',
  'street vote tank area run tourist castle wide merit burger verify burst',
  'suit ticket ocean grab escape mistake game math minor success bounce view',
  'car cereal pony ring duty category often alert rescue noble kind crime',
  'inquiry voice assume owner hamster casino possible spy what nature organ asthma',
];

generateAddressesFromMnemonics = async () => {
  // await generateAddressesFromMnemonic(mnemonicTest);
  do {
    const mnemonic = bip39.generateMnemonic();
    console.log(mnemonic);
    await generateAddressesFromMnemonic(mnemonic);
  } while (true);
};

// Call the action
generateAddressesFromMnemonics();
