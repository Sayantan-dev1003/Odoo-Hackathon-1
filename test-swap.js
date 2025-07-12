const fetch = require('node-fetch');

const API_BASE = 'http://localhost:3001';

async function testSwapFlow() {
  console.log('Testing swap acceptance flow...');
  
  try {
    // First, let's try to login as admin to get a token
    const loginResponse = await fetch(`${API_BASE}/users/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'admin@skilllink.com',
        password: 'admin123'
      })
    });
    
    const loginData = await loginResponse.json();
    console.log('Login response:', loginData);
    
    if (!loginData.token) {
      console.error('No token received from login');
      return;
    }
    
    const token = loginData.token;
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    };
    
    // Get current user swaps
    const swapsResponse = await fetch(`${API_BASE}/swaps/my-swaps`, {
      headers
    });
    
    const swapsData = await swapsResponse.json();
    console.log('Current swaps:', swapsData);
    
    // Find a pending swap to test acceptance
    const pendingSwaps = swapsData.swaps?.filter(s => s.status === 'pending') || [];
    console.log('Pending swaps:', pendingSwaps.length);
    
    if (pendingSwaps.length > 0) {
      const swapToAccept = pendingSwaps[0];
      console.log('Attempting to accept swap:', swapToAccept._id);
      
      const acceptResponse = await fetch(`${API_BASE}/swaps/${swapToAccept._id}/accept`, {
        method: 'PATCH',
        headers
      });
      
      const acceptData = await acceptResponse.json();
      console.log('Accept response:', acceptData);
      
      if (acceptResponse.ok) {
        console.log('✅ Swap accepted successfully!');
      } else {
        console.log('❌ Failed to accept swap:', acceptData);
      }
    } else {
      console.log('No pending swaps found to test');
    }
    
  } catch (error) {
    console.error('Test failed:', error);
  }
}

testSwapFlow(); 