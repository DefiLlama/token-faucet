import React from 'react';
import Layout from "../components/layout"
import { useSearch } from '../stores';
import Chain from '../components/chain'

function Home({changeTheme}) {
  const search = useSearch((state) => state.search);

  const tokens = [
    // symbol, testnet address, real address (to get logo)
    ["DAI", "0x332C7aC34580dfEF553B7726549cEc7015C4B39b", "0x6B175474E89094C44Da98b954EedeAC495271d0F", 18],
    ["USDC", "0x3861e9F29fcAFF738906c7a3a495583eE7Ca4C18", "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48", 6],
    ["USDT", "0x0aCBd07e458F228d4869066b998a0F55F36537B2", "0xdAC17F958D2ee523a2206206994597C13D831ec7", 6],
    ["WBTC", "0xaFb85F66FC8ad94805b586BE06dAc02876a0a5E5", "0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599", 8],
    ["WETH", "0x58d7ccbE88Fe805665eB0b6c219F2c27D351E649", "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2", 18]
  ]

  return (
    <Layout changeTheme={changeTheme}>
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
    </Layout>
  );
}

export default Home;
