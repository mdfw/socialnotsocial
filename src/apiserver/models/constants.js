/* A type of user */
const UserType = {
  NORMAL: 'ut_normal',
  ADMIN: 'ut_admin',
  CUSTSERVICE: 'ut_custservice',
  BANNED: 'ut_banned',
  DEMO: 'ut_demo',
};

/* The type of media */
const MediaType = {
  VIDEO: 'mt_video',
  PHOTO: 'mt_photo',
};

/* Enum for the post.status field */
const PostStatus = {
  DRAFT: 'ps_draft',
  POSTED: 'ps_posted',
  REMOVED: 'ps_removed',
};

/* The maximum we can return from a search */
const MAX_POST_SEARCH_RETURN_LIMIT = 100;

/* Enum for the Recipient.type field */
const RecipientType = {
  EMAIL: 'rt_email',
  TEXT: 'rt_text',
  POST: 'rt_post',
  FACEBOOK: 'rt_facebook',
};

/* Enum for the Recipient.status field */
const RecipientStatus = {
  VALIDATING: 'rs_validating',
  ACTIVE: 'rs_active',
  REMOVED: 'rs_removed',
  BOUNCING: 'rs_bounding',
  UNSUBSCRIBED: 'rs_unsubscribed',
};

export {
  UserType,
  MediaType,
  PostStatus,
  MAX_POST_SEARCH_RETURN_LIMIT,
  RecipientType,
  RecipientStatus,
};
