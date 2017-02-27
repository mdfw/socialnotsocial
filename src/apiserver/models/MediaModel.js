import { idier } from '../../shared/helpers/idier'; // eslint-disable-line no-unused-vars
import { MediaType } from './constants';


/* A piece of media that is uploaded.
 * Currently supports MediaType.
 */
module.exports = (sequelize, DataTypes) => {
  const Media = sequelize.define(
    'Media', {
      id: {
        type: DataTypes.BIGINT,
        field: 'id',
        primaryKey: true,
      },
      url: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isUrl: true,
        },
      },
      type: {
        type: DataTypes.ENUM,
        values: [MediaType.PHOTO, MediaType.VIDEO],
        defaultValue: MediaType.PHOTO,
      },
      width: {
        type: DataTypes.INTEGER,
      },
      height: {
        type: DataTypes.INTEGER,
      },
      size: {
        type: DataTypes.INTEGER,
      },
    },
    {
      underscored: true,
      paranoid: true,
      timestamps: true,
      hooks: {
        beforeValidate: function addId(media) {
          if (!media.id) {
            media.id = idier(); // eslint-disable-line no-param-reassign
          }
        },
      },
      classMethods: {
        associate: function associateModels(models) {
          Media.belongsTo(models.User);
          Media.belongsToMany(models.Post, { through: 'PostMedia' });
        },
      },
    },
  );

   /* Determine total number of media for account
   * @param {number} - userId
   */
  Media.totalForUser = function countAll(userId) {
    return Media.findAndCountAll({
      where: { user_id: userId },
    });
  };

  /* Update a Media
   * @param {number} - id: The id of the post
   * @param {number} - userId: The id of the user
   * @param {object} - updates: The fields and values to update
   * Returns: Either an updated post or null if it couldn't be found
   */
  Media.updateMedia = function updateMedia(id, userId, updates) {
    return Media.findOne({ where: { id: id, user_id: userId } })
    .then((foundItem) => {
      if (!foundItem) {
        return null;
      }
      const foundMedia = foundItem;
      const fieldsToUpdateKeys = Object.keys(updates);
      fieldsToUpdateKeys.forEach(function modifyItem(key) {
        foundMedia[key] = updates[key];
      });
      return foundMedia.save();
    });
  };

  /* Delete a Media
   * @param {number} - id: The id
   * @param {number} - userId: The id of the user
   * Returns: Either an deleted media or null if it couldn't be found
   */
  Media.deleteMedia = function deleteMedia(id, userId) {
    return Media.findOne({ where: { id: id, user_id: userId } })
    .then((thisMedia) => { // eslint-disable-line arrow-body-style
      if (thisMedia) {
        return thisMedia.destroy();
      }
      return null;
    });
  };
  return Media;
};
