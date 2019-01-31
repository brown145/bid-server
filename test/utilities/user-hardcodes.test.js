const { adminWhitelist, userWhitelist } = require('../../src/utilities/user-hardcodes');

describe('user-hardcodes', () => {
  it('has adminWhitelist', () => {
    expect(adminWhitelist.length).toBeGreaterThan(0);
  });

  it('has userWhitelist', () => {
    expect(userWhitelist.length).toBeGreaterThan(0);
  });
});
