import Web3 from 'web3'
import classNames from 'classnames'

import {
  abi as CONTRACT_ABI,
  networks
} from '../contracts/build/contracts/Contracts.json'
import '../style.less'

const CONTRACT_ADDRESS = Object.values(networks).pop().address

let [mounted, accounts, balance, f, persons, tempC] = [
  false,
  [],
  '',
  Element.prototype.addEventListener,
  [],
  null
]

Element.prototype.addEventListener = function (type, listener) {
  Element.prototype.removeEventListener.call(this, type, listener)
  f.call(this, type, listener)
}

const web3 = new Web3(Web3.givenProvider || 'ws://localhost:8545')

async function getBalance() {
  balance = Web3.utils.fromWei(await web3.eth.getBalance(accounts[0]), 'ether')
}

async function getPerson() {
  persons = []
  if (!tempC) {
    tempC = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS)
  }
  const totalP = await tempC.methods.count().call()

  for (let i = 1; i <= totalP; i++) {
    const p = await tempC.methods.persons(i - 1).call()
    persons.push(p)
  }
}

async function link() {
  try {
    accounts = await web3.eth.getAccounts()
    if (accounts.length === 0 && mounted) {
      accounts = await web3.eth.requestAccounts()
    }
    web3.eth.defaultAccount = accounts[0]

    if (accounts.length) {
      await getBalance()
      await getPerson()
    }

    doTotalRender()
  } catch (err) {
    console.error(err)
    alert('Connection refused')
  }
}

async function transfer() {
  try {
    await web3.eth.sendTransaction({
      from: accounts[0],
      to: '0x873b2931b0978A6e33dA46d53C17e5da3d68A27C',
      value: Web3.utils.toWei('10', 'ether')
    })
    await getBalance()
    doTotalRender()
  } catch {
    alert('Transfer refused')
  }
}

async function add(e) {
  e.preventDefault()
  const form = document.querySelector('#form')
  const data = new FormData(form)
  const name = data.get('name')
  const email = data.get('email')
  const rich = data.get('rich') === 'on'
  await tempC.methods
    .createPerson(name, email, rich)
    .send({ from: accounts[0] })
  await getBalance()
  await getPerson()
  doTotalRender()
}

function doTotalRender() {
  document.querySelector('#app').innerHTML = `
  <div>
    <h1>Hello World</h1>
    
    <div class='${classNames({ none: accounts.length === 0 })}'>
      <p>Current Account Address: <span id='account-add'>${
        accounts[0]
      }</span></p>
      <p class='b'>Account Balance: ${balance} ETH</p>
    </div>
    
    
    <button
      id='link'
      class='${classNames({ none: accounts.length !== 0 })}'
    >Link Metamask</button>
    
    <button
      class='${classNames({ none: accounts.length === 0 })}'
      id='transfer'
    >Transfer 10 ETH</button>
    
    <div class='${classNames('p-list', { none: accounts.length === 0 })}'>
      <h2>Persons</h2>
      <ul>
        ${persons
          .map(
            p => `<li>Name: ${p.name}  email: ${p.email} rich: ${p.rich}</li>`
          )
          .join('')}
      </ul>
      <form id='form'>
        <div>Name: <input type='text' name='name' placeholder='Name' /></div>
        <div>Email: <input type='text' name='email' placeholder='Email' /></div>
        <div>Rich: <input type='checkbox' name='rich'></div>
        <button type='submit' id='add'>Add</button>
      </form>
    </div> 
  </div>
  `

  document.querySelector('#link').addEventListener('click', link)
  document.querySelector('#transfer').addEventListener('click', transfer)
  document.querySelector('#add').addEventListener('click', add)
}

link().then(() => {
  mounted = true
})

doTotalRender()
