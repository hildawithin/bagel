var Tx = require('ethereumjs-tx');
const Web3 = require('web3')
const web3 = new Web3('https://rinkeby.infura.io/v3/d480e44fa4824ab881c3c940ad00dc17')

const account1 = '0x'
const account2 = '0x'

console.log(process.env.PRIVATE_KEY_1)
const privateKey1 = Buffer.from(process.env.PRIVATE_KEY_1, 'hex')
const privateKey2 = Buffer.from(process.env.PRIVATE_KEY_2, 'hex')

web3.eth.getBalance(account1, (err,bal)=>{
	console.log('account 1 balance: ', web3.utils.fromWei(bal, 'ether'))
})
web3.eth.getBalance(account2, (err,bal)=>{
	console.log('account 2 balance: ', web3.utils.fromWei(bal, 'ether'))
})

web3.eth.getTransactionCount(account1, (err, txCount) => {
	// build the transaction
	const txObject = {
		nonce: web3.utils.toHex(txCount),
		to: account2,
		value: web3.utils.toHex(web3.utils.toWei('1', 'ether')),
		gasLimit: web3.utils.toHex(21000),
		gasPrice: web3.utils.toHex(web3.utils.toWei('10', 'gwei'))
	}
	console.log(txObject)

	// sign the transaction
	const tx = new Tx(txObject)
	tx.sign(privateKey1)
	// serialization
	const serializedTransaction = tx.serialize()
	const raw = '0x' + serializedTransaction.toString('hex')
	// broadcast the transaction
	web3.eth.sendSignedTransaction(raw, (err, txHash) => {
		console.log('txHash: ', txHash)
	})
})

