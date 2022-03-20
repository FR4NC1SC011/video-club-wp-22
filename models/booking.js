module.exports = (sequelize, type) => {
  const Booking = sequelize.define('booking', {
    id: { type: type.INTEGER, primaryKey: true, autoIncrement: true },
    date: {
      type: 'TIMESTAMP',
      defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
      notNUll: true,
    },
    member_id: type.INTEGER,
    copy_id: type.INTEGER,
  });
  return Booking;
};
