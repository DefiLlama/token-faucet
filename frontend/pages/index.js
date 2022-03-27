import React, { useMemo } from 'react';
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import { withTheme } from '@material-ui/core/styles';
import { Typography, Button } from '@material-ui/core';
import Chain from '../components/chain';
import Header from '../components/header';

import AddIcon from '@material-ui/icons/Add';
import classes from './index.module.css';
import { useSearch, useTestnets } from '../stores';

function Home({ changeTheme, theme, sortedChains }) {
  const search = useSearch((state) => state.search);

  const addNetwork = () => {
    window.alert("WIP!")
  };

  const tokens = [
    // symbol, testnet address, real address (to get logo)
    ["DAI", "0x332C7aC34580dfEF553B7726549cEc7015C4B39b", "0x6B175474E89094C44Da98b954EedeAC495271d0F", 18],
    ["USDC", "0x3861e9F29fcAFF738906c7a3a495583eE7Ca4C18", "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48", 6],
    ["USDT", "0x0aCBd07e458F228d4869066b998a0F55F36537B2", "0xdAC17F958D2ee523a2206206994597C13D831ec7", 6],
    ["WBTC", "0xaFb85F66FC8ad94805b586BE06dAc02876a0a5E5", "0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599", 8],
    ["WETH", "0x58d7ccbE88Fe805665eB0b6c219F2c27D351E649", "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2", 18]
  ]

  return (
    <div className={styles.container}>
      <Head>
        <title>Token Faucet</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div className={theme.palette.type === 'dark' ? classes.containerDark : classes.container}>
          <div className={classes.copyContainer}>
            <div className={classes.copyCentered}>
              <Typography variant="h1" className={classes.chainListSpacing}>
                <span className={classes.helpingUnderline}>Token Faucet</span>
              </Typography>
              <Typography variant="h2" className={classes.helpingParagraph}>
                Helping devs test contracts on testnet
              </Typography>
              <Typography className={classes.subTitle}>
                Token Faucet is a list of token contracts deployed on all testnets with deterministic addresses.
                Anyone can mint tokens from these contracts or create new tokens easily.
              </Typography>
              <Button
                size="large"
                color="primary"
                variant="contained"
                className={classes.addNetworkButton}
                onClick={addNetwork}
                endIcon={<AddIcon />}
              >
                <Typography className={classes.buttonLabel}>Create token</Typography>
              </Button>
              <div className={classes.socials}>
                <a
                  className={`${classes.socialButton}`}
                  href="https://github.com/0xngmi/token-faucet"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <svg version="1.1" width="24" height="24" viewBox="0 0 24 24">
                    <path
                      fill={'#2F80ED'}
                      d="M12,2A10,10 0 0,0 2,12C2,16.42 4.87,20.17 8.84,21.5C9.34,21.58 9.5,21.27 9.5,21C9.5,20.77 9.5,20.14 9.5,19.31C6.73,19.91 6.14,17.97 6.14,17.97C5.68,16.81 5.03,16.5 5.03,16.5C4.12,15.88 5.1,15.9 5.1,15.9C6.1,15.97 6.63,16.93 6.63,16.93C7.5,18.45 8.97,18 9.54,17.76C9.63,17.11 9.89,16.67 10.17,16.42C7.95,16.17 5.62,15.31 5.62,11.5C5.62,10.39 6,9.5 6.65,8.79C6.55,8.54 6.2,7.5 6.75,6.15C6.75,6.15 7.59,5.88 9.5,7.17C10.29,6.95 11.15,6.84 12,6.84C12.85,6.84 13.71,6.95 14.5,7.17C16.41,5.88 17.25,6.15 17.25,6.15C17.8,7.5 17.45,8.54 17.35,8.79C18,9.5 18.38,10.39 18.38,11.5C18.38,15.32 16.04,16.16 13.81,16.41C14.17,16.72 14.5,17.33 14.5,18.26C14.5,19.6 14.5,20.68 14.5,21C14.5,21.27 14.66,21.59 15.17,21.5C19.14,20.16 22,16.42 22,12A10,10 0 0,0 12,2Z"
                    />
                  </svg>
                  <Typography variant="body1" className={classes.sourceCode}>
                    View Source Code
                  </Typography>
                </a>

                <a
                  className={`${classes.socialButton}`}
                  href="https://discord.com/invite/buPFYXzDDd"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <svg width="24" height="24" viewBox="0 0 640 512" xmlns="http://www.w3.org/2000/svg">
                    <path
                      fill={'#2F80ED'}
                      d="M524.531,69.836a1.5,1.5,0,0,0-.764-.7A485.065,485.065,0,0,0,404.081,32.03a1.816,1.816,0,0,0-1.923.91,337.461,337.461,0,0,0-14.9,30.6,447.848,447.848,0,0,0-134.426,0,309.541,309.541,0,0,0-15.135-30.6,1.89,1.89,0,0,0-1.924-.91A483.689,483.689,0,0,0,116.085,69.137a1.712,1.712,0,0,0-.788.676C39.068,183.651,18.186,294.69,28.43,404.354a2.016,2.016,0,0,0,.765,1.375A487.666,487.666,0,0,0,176.02,479.918a1.9,1.9,0,0,0,2.063-.676A348.2,348.2,0,0,0,208.12,430.4a1.86,1.86,0,0,0-1.019-2.588,321.173,321.173,0,0,1-45.868-21.853,1.885,1.885,0,0,1-.185-3.126c3.082-2.309,6.166-4.711,9.109-7.137a1.819,1.819,0,0,1,1.9-.256c96.229,43.917,200.41,43.917,295.5,0a1.812,1.812,0,0,1,1.924.233c2.944,2.426,6.027,4.851,9.132,7.16a1.884,1.884,0,0,1-.162,3.126,301.407,301.407,0,0,1-45.89,21.83,1.875,1.875,0,0,0-1,2.611,391.055,391.055,0,0,0,30.014,48.815,1.864,1.864,0,0,0,2.063.7A486.048,486.048,0,0,0,610.7,405.729a1.882,1.882,0,0,0,.765-1.352C623.729,277.594,590.933,167.465,524.531,69.836ZM222.491,337.58c-28.972,0-52.844-26.587-52.844-59.239S193.056,219.1,222.491,219.1c29.665,0,53.306,26.82,52.843,59.239C275.334,310.993,251.924,337.58,222.491,337.58Zm195.38,0c-28.971,0-52.843-26.587-52.843-59.239S388.437,219.1,417.871,219.1c29.667,0,53.307,26.82,52.844,59.239C470.715,310.993,447.538,337.58,417.871,337.58Z"
                    ></path>
                  </svg>
                  <Typography variant="body1" className={classes.sourceCode}>
                    Join our Discord
                  </Typography>
                </a>
              </div>
            </div>
          </div>
          <div className={theme.palette.type === 'dark' ? classes.listContainerDark : classes.listContainer}>
            <Header changeTheme={changeTheme} />
            <div className={classes.cardsContainer}>
              {(search === ''
                ? tokens
                : tokens.filter((token) => {
                    //filter
                    return (
                      token[0].toLowerCase().includes(search.toLowerCase())
                    );
                  })
              ).map((token, idx) => {
                return <Chain token={token} key={idx} />;
              })}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default withTheme(Home);
