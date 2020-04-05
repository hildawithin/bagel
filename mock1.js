var Tx = require('ethereumjs-tx');
const Web3 = require('web3')
const web3 = new Web3('https://rinkeby.infura.io/v3/d480e44fa4824ab881c3c940ad00dc17')

const account1 = '0x'
const account2 = '0x'

// const privateKey1 = Buffer.from(process.env.PRIVATE_KEY_1, 'hex')
// const privateKey2 = Buffer.from(process.env.PRIVATE_KEY_2, 'hex')

const contractAbi = []
const contractAddress = ''
const contract = new web3.eth.Contract(contractAbi, contractAddress)
// console.log(contract)
contract.getPastEvents(
	'allEvents', {
		fromBlock: 0,
		toBlock: 'latest'
	}, (err, events) => {console.log(events.length)})
// const data = contract.methods.transfer(account2, 1000).encodeABI()

// web3.eth.getBalance(account1, (err,bal)=>{
// 	console.log('account 1 balance: ', web3.utils.fromWei(bal, 'ether'))
// })
// web3.eth.getBalance(account2, (err,bal)=>{
// 	console.log('account 2 balance: ', web3.utils.fromWei(bal, 'ether'))
// })

// web3.eth.getTransactionCount(account1, (err, txCount) => {
// 	// smart contract data
// 	const data = '0x'
// 	// build the transaction
// 	const txObject = {
// 		nonce: web3.utils.toHex(txCount),
// 		gasLimit: web3.utils.toHex(2000000),
// 		gasPrice: web3.utils.toHex(web3.utils.toWei('10', 'gwei')),
//		to: contractAddress,
// 		data: data
// 	}

// 	// sign the transaction
// 	const tx = new Tx(txObject)
// 	tx.sign(privateKey1)
// 	// serialization
// 	const serializedTransaction = tx.serialize()
// 	const raw = '0x' + serializedTransaction.toString('hex')
// 	// broadcast the transaction
// 	web3.eth.sendSignedTransaction(raw, (err, txHash) => {
// 		console.log('txHash: ', txHash)
// 	})
// })

