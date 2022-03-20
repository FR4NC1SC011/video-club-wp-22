module.exports = (sequelize, type) => {
  const Actor = sequelize.define('actor', {
    id: { type: type.INTEGER, primaryKey:true, autoIncrement:true },
    name: type.STRING,
    lastName: type.STRING
  });
  return Actor;
};
