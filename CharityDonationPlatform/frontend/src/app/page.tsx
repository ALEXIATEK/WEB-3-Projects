'use client';

import { useState } from 'react';
import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { contractAddress, contractABI } from '../BlockchainServices/ABI/CharityDonations.json';
import { ethers } from 'ethers';

function App() {
  const account = useAccount();
  const { connectors, connect, status, error } = useConnect();
  const { disconnect } = useDisconnect();
  const [donationAmount, setDonationAmount] = useState('');
  const [transactionStatus, setTransactionStatus] = useState('');

  // Connect to the contract
  const connectToContract = () => {
    if (typeof window.ethereum !== 'undefined') {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(contractAddress, contractABI, signer);
      return contract;
    } else {
      alert('Please install MetaMask!');
      return null;
    }
  };

  // Donate function
  const donate = async (CharityId: number) => {
    if (!account.address) {
      alert('Please connect your wallet to proceed.');
      return;
    }

    const contract = connectToContract();
    if (contract) {
      try {
        const tx = await contract.donateFunds(CharityId, {
          value: ethers.utils.parseEther(donationAmount),
        });
        setTransactionStatus('Donation successful! Waiting for confirmation...');
        await tx.wait();
        setTransactionStatus('Donation confirmed!');
      } catch (error) {
        console.error(error);
        setTransactionStatus('Donation failed. Please try again.');
      }
    }
  };

  return (
    <div>
      <h2>Account</h2>
      <div>
        status: {account.status}
        <br />
        addresses: {JSON.stringify(account.addresses)}
        <br />
        chainId: {account.chainId}
      </div>

      {account.status === 'connected' && (
        <button type="button" onClick={() => disconnect()}>
          Disconnect
        </button>
      )}

      <div>
        <h2>Connect</h2>
        {connectors.map((connector) => (
          <button key={connector.uid} onClick={() => connect({ connector })} type="button">
            {connector.name}
          </button>
        ))}
        <div>{status}</div>
        <div>{error?.message}</div>
      </div>

      <div>
        <h2>Donation</h2>
        <input
          type="text"
          value={donationAmount}
          onChange={(e) => setDonationAmount(e.target.value)}
          placeholder="Amount to donate"
        />
        <button onClick={() => donate(1)} disabled={!account.address}>Donate</button> {/* Replace 1 with your actual CharityId */}
        <div>{transactionStatus}</div>
      </div>
    </div>
  );
}

export default App;



