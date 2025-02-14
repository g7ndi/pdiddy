export async function updateTokenStats() {
  const PAIR_ADDRESS = 'eqdhytjnpi9_wg2degco4mfye8zxgni6x92-ltzpnivj_gq4';
  const API_URL = `https://api.dexscreener.com/latest/dex/pairs/ton/${PAIR_ADDRESS}`;

  try {
    const response = await fetch(API_URL);
    const data = await response.json();
    const pair = data.pairs[0];

    // Update DOM elements with correct selectors
    const priceElement = document.getElementById('price-value');
    const marketCapElement = document.getElementById('mcap-value');
    const liquidityElement = document.getElementById('liquidity-value');

    const updateValue = (element: Element | null, value: string) => {
      if (element) {
        element.classList.add('updating');
        element.textContent = value;
        setTimeout(() => element.classList.remove('updating'), 500);
      }
    };

    updateValue(priceElement, `$${parseFloat(pair.priceUsd).toFixed(8)}`);
    updateValue(marketCapElement, `$${formatValue(pair.marketCap || pair.fdv)}`);
    updateValue(liquidityElement, `$${formatValue(pair.liquidity?.usd || 0)}`);
  } catch (error) {
    console.error('Error fetching token stats:', error);
    // Retry after 5 seconds if there's an error
    setTimeout(updateTokenStats, 5000);
  }
}

function formatValue(value: number): string {
  if (value >= 1e9) return `${(value / 1e9).toFixed(1)}B`;
  if (value >= 1e6) return `${(value / 1e6).toFixed(1)}M`;
  if (value >= 1e3) return `${(value / 1e3).toFixed(1)}K`;
  return value.toString();
}