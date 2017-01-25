import Account from './model';

/* Returns either the current account's accountId or, if onBehalfOfId is passed in
 *  to the body, it will verify if the current account can act on behalf of the passed
 *  in id and return that.
 *  @param {object} req - the request object that has a user account attached
 *  @returns {string} accountId - the accountId to use in searches.
 *   TODO: need to move it to it's own module since we're duplicating it in every controller.
 */
const activeAccountId = function getAccount(req) {
  const currentAccount = req.user;
  const onBehalfOfId = req.body.onBehalfOfId;
  if (onBehalfOfId && onBehalfOfId.length > 0) {
    if (currentAccount && currentAccount.canActOnBehalfOf(onBehalfOfId)) {
      return onBehalfOfId;
    }
  }
  if (req.user && req.user.accountId) {
    return req.user.accountId;
  }
  return null;
};

/* Adds an account to the Accounts database based on the fields passed in.
 * Params needed in body:
 *   @param {string} email - the email address
 *   @param {string} password - the user's password. Must pass owasp tests.
 *   @param {string} displayName - the name to display on the users page.
 */
const addAccountEndpoint = (req, res) => {
  const { email, password, displayName } = req.body;
  const newAccount = new Account({ email, password, displayName });
  newAccount.setPassword(password)
    .then(() => { // eslint-disable-line arrow-body-style
      return newAccount.save();
    })
    .then((createdAccount) => {
      const cleanedAccount = createdAccount.toJSON();
      res.status(201).json({
        success: true,
        message: 'Successfully Registered',
        account: cleanedAccount,
      });
    })
    .catch((err) => {
      let errorMessage = 'Account could not be created.';
      if (err.code === 11000) {
        errorMessage = 'Account with that email already exists';
      } else if (err.message) {
        errorMessage = err.message;
      }
      res.statusMessage = errorMessage; // eslint-disable-line no-param-reassign
      res.status(422).end();
    });
};

/* Get account info for accountId.
 * Params needed in req.body:
 *   @param (number=} onBehalfOfId - (optional) The accountId to act on behalf of if current account
 *      can act on behalf of it.
 *  @param {number} accountId - Will be pulled from req.user.
 *  Uses activeAccountId() to get the search parameters.
 */
const getAccountInfoEndpoint = (req, res) => { // eslint-disable-line consistent-return
  const accountId = activeAccountId(req);
  if (!accountId) {
    return res.status(422).json({ success: false, message: 'No accountId provided' });
  }
  Account.findOneAccount(accountId, false)
    .then((item) => {
      const cleanedItem = item.toJSON();
      res.status(201).json({
        success: true,
        account: cleanedItem,
      });
    })
    .catch((err) => {
      res.statusMessage = err.message; // eslint-disable-line no-param-reassign
      res.status(422).end();
    });
};

const updateAccountEndpoint = (req, res) => {
  res.status(418).json({
    message: 'Brewing',
  });
};

export { addAccountEndpoint, updateAccountEndpoint, getAccountInfoEndpoint };

