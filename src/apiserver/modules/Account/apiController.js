import { addAccount, updateAccount } from './controller';

/* add account from a web endpoint.
 * Respond to a signup web api event through the API by calling addAccount on the main controller
 */

const addAccountEndpoint = (req, res) => {
  const { email, password, displayName } = req.body;

  addAccount(email, password, displayName)
    .then(() => {
      res.status(201).json({
        success: true,
        message: 'Successfully Registerd',
      });
    })
    .catch((error) => {
      res.status(422).json({ success: false, message: error.errors });
    });
};

const updateAccountEndpoint = (req, res) => {
  updateAccount()
    .then(
      res.status(418).json({
        message: 'Brewing',
      }),
    );
};

export { addAccountEndpoint, updateAccountEndpoint };
