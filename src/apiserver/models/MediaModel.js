import { idier } from '../../shared/helpers/idier'; // eslint-disable-line no-unused-vars

/* The type of media */
const MediaType = {
  VIDEO: 'video',
  PHOTO: 'photo',
};

/* A piece of media that is uploaded.
 * Currently supports MediaType.
 */
const MediaDefinition = (sequelize, DataTypes) => {
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
  return Media;
};

export { MediaDefinition, MediaType };
