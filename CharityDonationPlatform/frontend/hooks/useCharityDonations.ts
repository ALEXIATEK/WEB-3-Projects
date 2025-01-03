import { useEffect, useState } from "react";
import { useAccount, useConnect, useReadContract, useWriteContract } from 'wagmi';

//useReadContract - get or read from the get functions from the smart contracts
//useWriteContracts - write to your smart contract

import abi from '../BlockchainServices/ABI/CharityDonations.json';

const contractAddress = ''