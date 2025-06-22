const axios = require('axios');

async function testServerConnection() {
    try {
        console.log('Testing server connection...');
        
        // Test health check
        const healthResponse = await axios.get('http://localhost:8000/health');
        console.log('✅ Health check passed:', healthResponse.data);
        
        return true;
    } catch (error) {
        console.error('❌ Server connection failed:');
        if (error.code === 'ECONNREFUSED') {
            console.error('- Server is not running on port 8000');
            console.error('- Please start the server using: npm start');
        } else {
            console.error('- Error:', error.message);
        }
        return false;
    }
}

testServerConnection();
