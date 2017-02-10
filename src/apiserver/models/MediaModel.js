import { idier } from '../../../shared/helpers/idier';

/* The type of media */
const MediaType = {
  VIDEO: 'video',
  PHOTO: 'photo',
};

/* A piece of media that is uploaded.
 * Currently supports MediaType
 */
const Media = (sequelize, DataTypes) => {
  const MediaDefinition = sequelize.define(
    'Media', {
      id: {
        type: DataTypes.BIGINT,
        field: 'id',
        defaultValue: sequelize.literal("idier()"),
        primaryKey: true,
      },
      url: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isUrl: true,
        }
      },
      type: {
        type: DataTypes.ENUM,
        values: [MediaType.PHOTO, MediaType.VIDEO],
        defaultValue : MediaType.PHOTO,        
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
      classMethods: {
        associate: function associateModels(models) {
          Media.belongsTo(models.User);
          Media.belongsToMany(models.Post, {through: 'PostMedia'});
        },
      },
    },
  );
  return MediaDefinition;
};

export { Media, MediaType };
