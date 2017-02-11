import { idier } from '../../shared/helpers/idier'; // eslint-disable-line no-unused-vars

/* A validation is a sent notification sent to a user or system of a new post.
 * Has an association with the Post object and the recipient that it will be sent to.
 * This would be called a notification in another system, but we are reserving that for future use.
 */
const UserValidationDefinition = (sequelize, DataTypes) => {
  const UserValidation = sequelize.define(
    'UserValidation', {
      id: {
        type: DataTypes.BIGINT,
        field: 'id',
        primaryKey: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      deliveredAt: {  // The date the item was either sent or pushed to service
        type: DataTypes.DATE,
        field: 'delivered_at',
      },
      visitedAt: { // The date the item was visited for the first time
        type: DataTypes.DATE,
        field: 'visited_at',
      },
    },
    {
      underscored: true,
      paranoid: true,
      timestamps: true,
      hooks: {
        beforeValidate: function addId(validation) {
          if (!validation.id) {
            validation.id = idier(); // eslint-disable-line no-param-reassign
          }
        },
      },
      classMethods: {
        associate: function associateModels(models) {
          UserValidation.belongsTo(models.User);
        },
      },
    },
  );
  return UserValidation;
};

export default UserValidationDefinition;
