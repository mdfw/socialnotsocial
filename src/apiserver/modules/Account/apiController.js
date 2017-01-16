import { addAccount, updateAccount } from './controller';

const addAccountEndpoint = (req, res) => {
  /* addAccountEndpoint: Respond to a signup web api event through the API by calling addAccount */
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

const updateAccountEnpoint = (req, res) => {
  updateAccount()
    .then(
      res.status(418).json({
        message: 'Brewing',
      }),
    );
};

export { addAccountEndpoint, updateAccountEnpoint };
