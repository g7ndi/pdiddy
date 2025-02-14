import './style.css'
import { updateTokenStats } from './tokenStats'

async function initializeApp() {
  try {
    // First data fetch
    await updateTokenStats();
    
    // Set up periodic updates every 15 seconds
    setInterval(updateTokenStats, 15000);
    
    // Hide loader and show app
    const loader = document.getElementById('loader');
    const app = document.getElementById('app');
    
    if (loader && app) {
      loader.style.opacity = '0';
      loader.style.transition = 'opacity 0.5s ease';
      
      setTimeout(() => {
        loader.style.display = 'none';
        app.style.display = 'block';
        app.style.opacity = '0';
        
        requestAnimationFrame(() => {
          app.style.transition = 'opacity 0.5s ease';
          app.style.opacity = '1';
        });
      }, 500);
    }

    // Setup wallet copy functionality
    const copyButton = document.getElementById('copy-wallet');
    const walletAddress = document.getElementById('wallet-address');
    const tooltip = document.getElementById('copy-tooltip');

    if (copyButton && walletAddress && tooltip) {
      copyButton.addEventListener('click', async () => {
        try {
          await navigator.clipboard.writeText(walletAddress.textContent?.trim() || '');
          
          // Show tooltip
          tooltip.classList.add('opacity-100');
          
          // Hide tooltip after 2 seconds
          setTimeout(() => {
            tooltip.classList.remove('opacity-100');
          }, 2000);
          
          // Add success animation to the button
          copyButton.classList.add('text-secondary');
          setTimeout(() => {
            copyButton.classList.remove('text-secondary');
          }, 1000);
        } catch (err) {
          console.error('Failed to copy:', err);
        }
      });
    }
  } catch (error) {
    console.error('Error initializing app:', error);
  }
}

initializeApp();
