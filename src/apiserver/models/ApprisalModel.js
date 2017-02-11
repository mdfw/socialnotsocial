import { idier } from '../../shared/helpers/idier'; // eslint-disable-line no-unused-vars

/* An apprisal is an actual notification sent to a user or system of a new post.
 * Has an association with the Post object and the recipient that it will be sent to.
 * This would be called a notification in another system, but we are reserving that for future use.
 */
module.exports = (sequelize, DataTypes) => {
  const Apprisal = sequelize.define(
    'Apprisal', {
      id: {
        type: DataTypes.BIGINT,
        field: 'id',
        primaryKey: true,
      },
      deliveredAt: {  // The date the item was either sent or pushed to service
        type: DataTypes.DATE,
        field: 'delivered_at',
      },
      firstOpenedAt: {  // This only applies to emails with trackers. When the email was viewed.
        type: DataTypes.DATE,
        field: 'first_opened_at',
      },
      firstViewedAt: {  // When this item was viewed on site.
        type: DataTypes.DATE,
        field: 'first_viewed_at',
      },
    },
    {
      underscored: true,
      paranoid: true,
      timestamps: true,
      hooks: {
        beforeValidate: function addId(apprisal) {
          if (!apprisal.id) {
            apprisal.id = idier(); // eslint-disable-line no-param-reassign
          }
        },
      },
      classMethods: {
        associate: function associateModels(models) {
          Apprisal.belongsTo(models.Post);
          Apprisal.belongsTo(models.Recipient);
        },
      },
    },
  );
  return Apprisal;
};

