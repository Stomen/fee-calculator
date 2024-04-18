const fs = require('fs');
const parseTransactions = require('../transactionParser');

describe('parseTransactions', () => {
  it('should parse transactions from a file', () => {
    const filePath = 'path/to/input.json';
    const fileData = '[{"id": 1, "amount": 100}, {"id": 2, "amount": 200}]';
    jest.spyOn(fs, 'readFileSync').mockReturnValue(fileData);

    const result = parseTransactions(filePath);

    expect(result).toEqual(JSON.parse(fileData));
    expect(fs.readFileSync).toHaveBeenCalledWith(filePath, 'utf8');
  });

  it('should throw an error if file reading or parsing fails', () => {
    const filePath = 'path/to/input.json';
    const error = new Error('File read error');
    jest.spyOn(fs, 'readFileSync').mockImplementation(() => {
      throw error;
    });

    expect(() => {
      parseTransactions(filePath);
    }).toThrow(error);

    expect(fs.readFileSync).toHaveBeenCalledWith(filePath, 'utf8');
  });
});