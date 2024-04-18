const feeConfig = {
    cash_in: {
        percentage: 0.03,
        max: 5.00  
    },
    cash_out: {
        natural: {
            percentage: 0.3,
            weekly_free_limit: 1000.00  
        },
        juridical: {
            percentage: 0.3,
            min: 0.50
        }
    }
};

module.exports = feeConfig;
