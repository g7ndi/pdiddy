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
  } catch (error) {
    console.error('Error initializing app:', error);
  }
}

initializeApp();
