module.exports = (sequelize, Sequelize) => {
    const todo = sequelize.define("todo", {
      id: {
        // needs to be unique
        type: Sequelize.UUID,
        primaryKey: true,
        allowNull: false,
        unique: true
      },
      todo: {
        type: Sequelize.STRING
      },
      completed: {
        type: Sequelize.BOOLEAN
      }
    });
  
    return todo;
  };