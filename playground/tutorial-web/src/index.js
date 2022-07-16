import Web3 from 'web3'
import classNames from 'classnames'

import '../style.less'

let [mounted, accounts, balance, f] = [false, [], '', Element.prototype.addEventListener]

Element.prototype.addEventListener = function(type, listener) {
  Element.prototype.removeEventListener.call(this, type, listener)
  f.call(this, type, listener)
}

const web3 = new Web3(Web3.givenProvider || 'ws://localhost:8545')

async function getBalance() {
  balance = Web3.utils.fromWei(await web3.eth.getBalance(accounts[0]), 'ether')
}

async function link() {
  try {
    accounts = await web3.eth.getAccounts()
    if (accounts.length === 0 && mounted) {
      accounts = await web3.eth.requestAccounts()
    }
    web3.eth.defaultAccount = accounts[0]
    if (accounts.length) await getBalance()

    doTotalRender()
  } catch {
    alert('Connection refused')
  }
}

async function transfer() {
  try {
    await web3.eth.sendTransaction({
      from: accounts[0],
      to: '0xF2464BB53281e9071C60Bf2E796eFd8685C631B8',
      value: Web3.utils.toWei('10', 'ether')
    })
    await getBalance()
    doTotalRender()
  } catch {
    alert('Transfer refused')
  }
}

function doTotalRender() {
  document.querySelector('#app').innerHTML = `
  <div>
    <h1>Hello World</h1>
    
    <div class="${classNames({ none: accounts.length === 0 })}">
      <p>Current Account Address: <span id="account-add">${accounts[0]}</span></p>
      <p class="b">Account Balance: ${balance} ETH</p>
    </div>
    
    
    <button id="link" class="${classNames({ none: accounts.length !== 0 })}">Link Metamask</button>
    
    <button class="${classNames({ none: accounts.length === 0 })}" id="transfer">Transfer 10 ETH</button>
  </div>
  `

  document.querySelector('#link').addEventListener('click', link)
  document.querySelector('#transfer').addEventListener('click', transfer)

}

link().then(() => {
  mounted = true
})

doTotalRender()
