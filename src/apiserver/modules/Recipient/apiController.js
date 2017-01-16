import { getRecipients, addRecipient } from './controller';

const getRecipientsEndpoint = (req, res) => {
  //const { ownerAccountId } = req.body;
  const ownerAccountId = req.params.ownerAccountId;
  console.log('Getting recipients from api');
  getRecipients(ownerAccountId)
    .then((recipients) => {
      console.log('Recieved recipients');
      console.dir(recipients)
      res.status(201).json({
        success: true,
        message: 'Successfully Found',
      });
    })
    .catch((error) => {
      console.log('getRecipientEndpoint: Error returned : ');
      console.dir(error);
      res.status(422).json({ success: false, message: error.errors });
    });
};


const addRecipientEndpoint = (req, res) => {
  /* addRecipientEndpoint: Respond to the add event through the API by calling addRecipient */
  const { email, ownerAccountId, displayName } = req.body;
  console.log('Adding recipient from api');
  addRecipient(email, displayName, ownerAccountId)
    .then(() => {
      res.status(201).json({
        success: true,
        message: 'Recipient Added',
      });
    })
    .catch((error) => {
      console.log('addRecipientEndpoint: Error returned : ');
      console.dir(error);
      res.status(422).json({ success: false, message: error.errors });
    });
};

const updateRecipient = (req, res) => {
  res.status(418).json({
    message: 'Brewing',
  });
};

export { getRecipientsEndpoint, addRecipientEndpoint, updateRecipient };