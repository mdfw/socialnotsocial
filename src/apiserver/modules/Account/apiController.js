import Account from './model';

const addAccountEndpoint = (req, res) => {
  const { email, password, displayName } = req.body;
  const newAccount = new Account({ email, password, displayName });
  console.log('Heres the new account before save or even setting password');
  console.dir(newAccount);
        console.log('newAccount has setPassword?');
      if(typeof newAccount.setPassword === 'function') {
        console.log("It's a function");
      } else if (typeof newAccount.setPassword === 'undefined') {
        console.log("It's undefined");
      } else {
        console.log("It's neither undefined nor a function. It's a " + typeof newAccount.setPassword);
      }
      console.log('newAccount has comparePassword?');
      if(typeof newAccount.comparePassword === 'function') {
        console.log("It's a function");
      } else if (typeof newAccount.comparePassword === 'undefined') {
        console.log("It's undefined");
      } else {
        console.log("It's neither undefined nor a function. It's a " + typeof newAccount.comparePassword);
      }
  newAccount.setPassword(password)
    .then(() => { // eslint-disable-line arrow-body-style
      return newAccount.save();
    })
    .then((createdAccount) => {
      console.log('Created new account: ');
      console.dir(createdAccount);
      console.dir(createdAccount.toObject());
      res.status(201).json({
        success: true,
        message: 'Successfully Registered',
      });
    })
    .catch((err) => {
      console.log('Account creation error: ');
      console.dir(err);
      let errorMessage = 'Account could not be created.';
      if (err.code === 11000) {
        errorMessage = 'Account with that email already exists';
      } else if (err.message) {
        errorMessage = err.message;
      }
      res.status(422).json({ success: false, messages: errorMessage });
    });
};

const updateAccountEndpoint = (req, res) => {
  res.status(418).json({
    message: 'Brewing',
  });
};

export { addAccountEndpoint, updateAccountEndpoint };
