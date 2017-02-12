/* A type of user */
const UserType = {
  NORMAL: 'normal',
  ADMIN: 'admin',
  CUSTSERVICE: 'custservice',
  BANNED: 'banned',
  DEMO: 'demo',
};

/* The type of media */
const MediaType = {
  VIDEO: 'video',
  PHOTO: 'photo',
};

/* Enum for the post.status field */
const PostStatus = {
  DRAFT: 'draft',
  POSTED: 'posted',
  REMOVED: 'removed',
};

/* The maximum we can return from a search */
const MAX_POST_SEARCH_RETURN_LIMIT = 100;


/* Enum for the Recipient.type field */
const RecipientType = {
  EMAIL: 'email',
  TEXT: 'text',
  FACEBOOK: 'facebook',
};

export {
  UserType,
  MediaType,
  PostStatus,
  MAX_POST_SEARCH_RETURN_LIMIT,
  RecipientType,
};
