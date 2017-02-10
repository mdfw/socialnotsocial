import { idier } from '../../../shared/helpers/idier';

/* Enum for the post.status field */
const PostStatus = {
  DRAFT: 'draft',
  POSTED: 'posted',
  REMOVED: 'removed',
};
/* A post is the atomic messages of the user
 * https://developers.facebook.com/docs/graph-api/reference/v2.8/post
 */
const Post = (sequelize, DataTypes) => {
  const PostDefinition = sequelize.define(
    'Post', {
      id: {
        type: DataTypes.BIGINT,
        field: 'id',
        defaultValue: sequelize.literal("idier()"),
        primaryKey: true,
      },
      status: {
        type: DataTypes.ENUM,
        values: [PostStatus.DRAFT, PostStatus.POSTED, PostStatus.REMOVED],
        defaultValue : PostStatus.POSTED,        
      },
      message: {
        type: DataTypes.STRING(5000),
        allowNull: false,
      },
      subject: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      edited: {
        type: DataTypes.BOOLEAN,
      },
    },
    {
      underscored: true,
      paranoid: true,
      timestamps: true,
      classMethods: {
        associate: function associateModels(models) {
          Post.belongsTo(models.User);
          Post.belongsToMany(models.Media, {through: 'PostMedia'});
          Post.hasMany(models.Apprisal);
        },
      },
    },
  );
  return PostDefinition;
};

export { Post, PostStatus };
