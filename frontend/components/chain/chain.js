import React, { useEffect, useMemo, useState } from 'react';
import { Typography, Paper, Button, Tooltip, withStyles } from '@material-ui/core';
import classes from './chain.module.css';
import stores, { useAccount, useChain } from '../../stores/index.js';
import { ACCOUNT_CONFIGURED } from '../../stores/constants';
import Image from 'next/image';
import { addToNetwork, renderProviderText } from '../../utils';
import Link from 'next/link';
import { ethers } from "ethers";

const avaxTokens = {
  "0x3861e9F29fcAFF738906c7a3a495583eE7Ca4C18": "0x68b56283f6C6AC75489B63D09288Dfa2bea104A1",
  "0x332C7aC34580dfEF553B7726549cEc7015C4B39b": "0x36861654d8E5e0a641085603a8E7cb88E5419d31",
  "0x0aCBd07e458F228d4869066b998a0F55F36537B2": "0x8Cf18401B5cC31176bE8F9d6f586a64506B583F1",
  "0xaFb85F66FC8ad94805b586BE06dAc02876a0a5E5": "0xAF64a37533E76A2Ff19Dda45806c157037A30FAd",
  "0x58d7ccbE88Fe805665eB0b6c219F2c27D351E649": "0x330f5B4784100d8eD4DeFb8D80C411BDA435205C"
}

async function mint(address) {
  const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
  const { chainId } = await provider.getNetwork()
  if(chainId === 43113){
    address = avaxTokens[address];
  }
  const signer = provider.getSigner();
  const contract = new ethers.Contract(
    address,
    [
      //"function transferFrom(address _from, address _to, uint256 _tokenId) external payable",
      "function mint() external"
    ],
    signer
  )
  await contract.mint()
}

const chainIdToExplorer = {
  3: "https://ropsten.etherscan.io/address",
  4: "https://rinkeby.etherscan.io/address",
  5: "https://goerli.etherscan.io/address",
  42: "https://kovan.etherscan.io/address",
}

async function getChainId() {
  const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
  const { chainId } = await provider.getNetwork()
  return chainId
}

export default function Chain({ token: [symbol, address, originalAddress, decimals] }) {
  const account = useAccount((state) => state.account);
  const setAccount = useAccount((state) => state.setAccount);

  const [chainId, setChainId] = useState(undefined)

  useEffect(() => {
    const accountConfigure = () => {
      const accountStore = stores.accountStore.getStore('account');
      setAccount(accountStore);
    };

    stores.emitter.on(ACCOUNT_CONFIGURED, accountConfigure);

    const accountStore = stores.accountStore.getStore('account');
    setAccount(accountStore);
    getChainId().then(setChainId)

    return () => {
      stores.emitter.removeListener(ACCOUNT_CONFIGURED, accountConfigure);
    };
  }, []);

  const icon = useMemo(() => {
    return originalAddress ? `https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/${originalAddress}/logo.png` : '/unknown-logo.png';
  }, [address]);

  return (
    <>
      <Paper elevation={1} className={classes.chainContainer} key={address}>
        <div className={classes.chainNameContainer}>
          <Image
            src={icon}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = '/chains/unknown-logo.png';
            }}
            width={28}
            height={28}
            className={classes.avatar}
          />

          <Tooltip title={symbol}>
            <Typography variant="h3" className={classes.name} noWrap style={{ marginLeft: '24px' }}>
                {symbol}
            </Typography>
          </Tooltip>
        </div>
        <div className={classes.chainInfoContainer}>
          <div className={classes.dataPoint}>
            <Typography variant="subtitle1" color="textSecondary" className={classes.dataPointHeader}>
              Address
            </Typography>
            <Typography variant="h5">{address.substring(0, 8)}...</Typography>
          </div>
          <div className={classes.dataPoint}>
            <Typography variant="subtitle1" color="textSecondary" className={classes.dataPointHeader}>
              Decimals
            </Typography>
            <Typography variant="h5">{decimals}</Typography>
          </div>
        </div>
        <div style={{ marginBottom: "-0.5em" }}>
          {account?.address &&
            <>
              <div className={classes.addButton}>
                <Button variant="outlined" color="primary" onClick={() => mint(address)}>
                  Mint
                </Button>
              </div>
              <a href={`${chainIdToExplorer[chainId]}/${address}`}>
                <div className={classes.addButton}>
                  <Button variant="outlined" color="primary">
                    Go to explorer
                  </Button>
                </div>
              </a>
            </>
          }
          <div className={classes.addButton}>
            <Button variant="outlined" color="primary" onClick={() => addToNetwork(account, address, symbol, decimals, icon)}>
              {renderProviderText(account)}
            </Button>
          </div>
          <div className={classes.addButton}>
            <Button variant="outlined" color="primary" onClick={() => navigator.clipboard.writeText(address)}>
              Copy address
            </Button>
          </div>
        </div>
      </Paper>
    </>
  );
}
