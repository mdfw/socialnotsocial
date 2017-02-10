import { idier } from '../../../shared/helpers/idier';

/* A validation is a sent notification sent to a user or system of a new post.
 * Has an association with the Post object and the recipient that it will be sent to.
 * This would be called a notification in another system, but we are reserving that for future use.
 */
const UserValidation = (sequelize, DataTypes) => {
  const UserValidationDefinition = sequelize.define(
    'UserValidation', {
      id: {
        type: DataTypes.BIGINT,
        field: 'id',
        defaultValue: sequelize.literal("idier()"),
        primaryKey: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      deliveredAt: {  // The date the item was either sent or pushed to service
        type: DataTypes.DATE,
      },
      visitedAt: {  // 
        type: DataTypes.DATE,        
      },
    },
    {
      underscored: true,
      paranoid: true,
      timestamps: true,
      classMethods: {
        associate: function associateModels(models) {
          UserValidation.belongsTo(models.User);
        },
      },
    },
  );
  return UserValidationDefinition;
};

export default UserValidation;
