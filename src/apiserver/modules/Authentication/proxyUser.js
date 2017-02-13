/* Returns either the current user's id or, if onBehalfOfId is passed in
 *  to the body, it will verify if the current user can act on behalf of the passed
 *  in id and return that.
 *  @param {object} req - the request object that has a user account attached
 *  @returns {string} userId - the id to use in actions.
 */
const proxyUserId = function getAccount(req) {
  const currentUser = req.user;
  const onBehalfOfId = req.body.onBehalfOfId;
  if (onBehalfOfId && onBehalfOfId.length > 0) {
    if (currentUser && currentUser.canActOnBehalfOf(onBehalfOfId)) {
      return onBehalfOfId;
    }
  }
  if (req.user && req.user.id) {
    return req.user.id;
  }
  return null;
};

export default proxyUserId;
