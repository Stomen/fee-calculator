const fs = require('fs');

const parseTransactions = (filePath) => {
    try {
        const data = fs.readFileSync(filePath, 'utf8');
        return JSON.parse(data); 
    } catch (error) {
        console.error('Error reading or parsing the file:', error);
        throw error; 
    }
}

module.exports = parseTransactions;
