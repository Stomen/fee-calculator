const FeeCalculator = require("./feeCalculator")
const parseTransactions = require('./transactionParser');

function main(inputFilePath) {
    const feeCalculator = new FeeCalculator();
    try {
        const transactions = parseTransactions(inputFilePath);
        transactions.forEach(transaction => {
            const fee = feeCalculator.calculateFee(transaction);
            console.log(fee.toFixed(2));
        });
    } catch (error) {
        console.error('Error processing transactions:', error);
    }
}

const filePath = process.argv[2];
main(filePath);
