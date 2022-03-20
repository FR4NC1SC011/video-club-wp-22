module.exports = (sequelize, type) => {
  const Copie = sequelize.define('copie', {
    id: { type: type.INTEGER, primaryKey:true, autoIncrement:true },
    number: type.INTEGER,
    format: type.ENUM,
    estaus: type.ENUM,
  });
  return Copie;
};
