const moment = require('moment');
const config = require('./config');

class FeeCalculator {
    constructor() {
        this.userWeeklyTotal = {};
    }

    calculateFee(transaction) {
        let fee = 0;
        const amount = transaction.operation.amount;
        

        if (transaction.type === 'cash_in') {
            fee = Math.min(amount * config.cash_in.percentage / 100, config.cash_in.max);
        } else if (transaction.type === 'cash_out') {
            if (transaction.user_type === 'natural') {
                fee = this.calculateNaturalPersonFee(transaction);
            } else if (transaction.user_type === 'juridical') {
                fee = Math.max(amount * config.cash_out.juridical.percentage / 100, config.cash_out.juridical.min);
            }
        }

        return Math.ceil(fee * 100) / 100;
    }

     calculateNaturalPersonFee(transaction) {
        const amount = transaction.operation.amount;
        const userId = transaction.user_id;
        const date = moment(transaction.date);
        const weekOfYear = date.isoWeek();
        const year = date.isoWeekYear();
    
        const userWeekKey = `${userId}_${year}_${weekOfYear}`;
    
        if (!this.userWeeklyTotal[userWeekKey]) {
            this.userWeeklyTotal[userWeekKey] = 0;
        }
    
        const alreadyCashedOut = this.userWeeklyTotal[userWeekKey];
        let taxableAmount = 0;
        if (alreadyCashedOut < config.cash_out.natural.weekly_free_limit) {
            if (amount + alreadyCashedOut > config.cash_out.natural.weekly_free_limit) {
                taxableAmount = amount + alreadyCashedOut - config.cash_out.natural.weekly_free_limit;
            }
        } else {
            taxableAmount = amount;
        }
    
        let fee = taxableAmount * config.cash_out.natural.percentage / 100;
        this.userWeeklyTotal[userWeekKey] += amount; 
        
        return fee;
    }
    
}

module.exports = FeeCalculator;
