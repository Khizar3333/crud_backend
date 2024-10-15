



export const setCORSHeaders = (res) => {
    res.setHeader('Access-Control-Allow-Origin', 'https://crud-frontend-five-rouge.vercel.app'); // Replace with your frontend URL
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Methods', 'POST, PUT, DELETE, GET, OPTIONS');
  };

