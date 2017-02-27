import { idier } from '../../shared/helpers/idier'; // eslint-disable-line no-unused-vars
import { MAX_POST_SEARCH_RETURN_LIMIT } from './constants';


module.exports = (sequelize, DataTypes) => {
  const Album = sequelize.define(
    'Album', {
      id: {
        type: DataTypes.BIGINT,
        field: 'id',
        primaryKey: true,
      },
    },
    {
      underscored: true,
      paranoid: true,
      timestamps: true,
      hooks: {
        beforeValidate: function addId(album) {
          if (!album.id) {
            album.id = idier(); // eslint-disable-line no-param-reassign
          }
        },
      },
      classMethods: {
        associate: function associateModels(models) {
          Album.belongsTo(models.User, {
            foreignKey: {
              field: 'user_id',
              allowNull: false,
            },
            onDelete: 'cascade',
          });
          Album.belongsToMany(models.Media, { through: 'AlbumMedia' });
          Album.belongsToMany(models.Post, { through: 'PostAlbum' });
        },
      },
    },
  );

  /* Find all albums for a userId
   * @param {string} userId - the userId to search for
   * @param {number} limit - the number to find.
   * @param {number} offset - The number to skip.
   * @param {number} beforeId - the identifier to sort before. If this is passed, limit is used.
   */
  Album.findAllForUser = function findAllForUser(userId, options) {
    let limit = 20;
    if (options.limit) {
      limit = options.limit;
    }
    let offset = 0;
    if (options.limit) {
      offset = options.offset;
    }
    let beforeId = null;
    if (options.beforeId) {
      beforeId = options.beforeId;
    }
    let includeTables = [];
    if (options.includeTables) {
      includeTables = options.includeTables;
    }

    if (!userId) {
      throw new Error('No userId provided');
    }
    const whereClause = {};

    whereClause.where = { user_id: Number(userId) };

    if (beforeId && beforeId > 0) {
      whereClause.id = { $lt: beforeId };
    }

    let limiter = limit;
    if (limiter > MAX_POST_SEARCH_RETURN_LIMIT) {
      limiter = MAX_POST_SEARCH_RETURN_LIMIT;
    }
    whereClause.limit = limiter;

    if (offset > 0) {
      whereClause.offset = offset;
    }
    whereClause.order = 'id DESC';
    if (includeTables) {
      whereClause.include = includeTables;
    }
    return this.findAll(whereClause);
  };

  /* Determine total number of albums for account
   * @param {number} - userId
   */
  Album.totalForUser = function countAlbums(userId) {
    return Album.findAndCountAll({
      where: { user_id: userId },
    });
  };

  /* Update an album
   * @param {number} - id: The id of the album
   * @param {number} - userId: The id of the user
   * @param {object} - updates: The fields and values to update
   * Returns: Either an updated album or null if it couldn't be found
   */
  Album.updateAlbum = function updateAlbum(id, userId, updates) {
    return Album.findOne({ where: { id: id, user_id: userId } })
    .then((foundItem) => {
      if (!foundItem) {
        return null;
      }
      const foundAlbum = foundItem;
      const fieldsToUpdateKeys = Object.keys(updates);
      fieldsToUpdateKeys.forEach(function modifyItem(key) {
        foundAlbum[key] = updates[key];
      });
      return foundAlbum.save();
    });
  };

  /* Delete a album
   * @param {number} - id: The id of the album
   * @param {number} - userId: The id of the user
   * Returns: Either an deleted album or null if it couldn't be found
   */
  Album.deleteAlbum = function deleteAlbum(id, userId) {
    return Album.findOne({ where: { id: id, user_id: userId } })
    .then((foundItem) => { // eslint-disable-line consistent-return
      if (!foundItem) {
        return null;
      }
      const foundAlbum = foundItem;
      return foundAlbum.save();
    })
    .then((thisAlbum) => { // eslint-disable-line arrow-body-style
      return thisAlbum.destroy();
    });
  };

  return Album;
};
