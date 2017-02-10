import { idier } from '../../../shared/helpers/idier';

/* An apprisal is an actual notification sent to a user or system of a new post.
 * Has an association with the Post object and the recipient that it will be sent to.
 * This would be called a notification in another system, but we are reserving that for future use.
 */
const Apprisal = (sequelize, DataTypes) => {
  const ApprisalDefinition = sequelize.define(
    'Apprisal', {
      id: {
        type: DataTypes.BIGINT,
        field: 'id',
        defaultValue: sequelize.literal("idier()"),
        primaryKey: true,
      },
      deliveredAt: {  // The date the item was either sent or pushed to service
        type: DataTypes.DATE,
      },
      firstOpenedAt: {  // This only applies to emails with trackers. When the email was viewed.
        type: DataTypes.DATE,        
      },
      firstViewedAt: {  // When this item was viewed on site.
        type: DataTypes.DATE,        
      },
    },
    {
      underscored: true,
      paranoid: true,
      timestamps: true,
      classMethods: {
        associate: function associateModels(models) {
          Apprisal.belongsTo(models.Post);
          Apprisal.belongsTo(models.Recipient);
        },
      },
    },
  );
  return ApprisalDefinition;
};

export default Apprisal;
