const FeeCalculator = require('../feeCalculator');

describe('FeeCalculator', () => {
  let feeCalculator;

  beforeEach(() => {
    feeCalculator = new FeeCalculator();
  });

  describe('calculateFee', () => {
    it('should calculate the fee for cash_in transactions', () => {
      const transaction = {
        type: 'cash_in',
        operation: {
          amount: 100
        }
      };

      const fee = feeCalculator.calculateFee(transaction);

      expect(fee).toBe(0.03);
    });

    it('should calculate the fee for cash_out transactions of natural persons', () => {
      const transaction = {
        type: 'cash_out',
        user_type: 'natural',
        operation: {
          amount: 200
        },
        user_id: '123',
        date: '2022-01-01'
      };

      const fee = feeCalculator.calculateFee(transaction);

      expect(fee).toBe(0);
    });

    it('should calculate the fee for cash_out transactions of juridical persons', () => {
      const transaction = {
        type: 'cash_out',
        user_type: 'juridical',
        operation: {
          amount: 300
        }
      };

      const fee = feeCalculator.calculateFee(transaction);

      expect(fee).toBe(0.9);
    });
  });
});