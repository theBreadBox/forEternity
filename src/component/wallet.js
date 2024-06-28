import { createWeb3Modal, defaultWagmiConfig } from '@web3modal/wagmi'

import { mainnet, arbitrum } from 'viem/chains'
import { reconnect } from '@wagmi/core'
// 1. Get a project ID at https://cloud.walletconnect.com

const projectId = '910976f16918d554f9318e69ce86'

// 2. Create wagmiConfig
const metadata = {
  name: 'Web3Modal',
  description: 'Web3Modal Example',
  url: 'https://web3modal.com', // origin must match your domain & subdomain.
  icons: ['https://avatars.githubusercontent.com/u/37784886']
}

const chains = [mainnet, arbitrum] as const
export const config = defaultWagmiConfig({
  chains,
  projectId,
  metadata,
  ...wagmiOptions // Optional - Override createConfig parameters
})
reconnect(config)

// 3. Create modal
const modal = createWeb3Modal({
  wagmiConfig: config,
  projectId,
  enableAnalytics: true, // Optional - defaults to your Cloud configuration
  enableOnramp: true // Optional - false as default
})
import { watchAccount, disconnect, getAccount } from '@wagmi/core'

function connect() {
  if (getAccount(config).isConnected) {
    disconnect(config)
  } else {
    modal.open()
  }
}

const btnEl = document.getElementById('btn')
const userEl = document.getElementById('user')

btnEl.addEventListener('click', connect)

// listening for account changes
watchAccount(config,
  {
    onChange(account) {
      userEl.innerText = account.address ?? ''
      if (account.isConnected) {
        btnEl.innerText = 'Disconnect'
      } else {
        btnEl.innerText = 'Connect'
      }
    }
  }