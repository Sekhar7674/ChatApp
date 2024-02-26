import { Model, DataTypes } from "sequelize";
import connection from "../connection";

const initUser = (sequelize, Types) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    // static associate(models) {
    // 	// define association here
    // }
  }
  User.init(
    {
      id: {
        type: Types.INTEGER,
        primaryKey: true,
        autoIncrement: true, 
      },
      name: Types.STRING,
      password: Types.STRING,
      gender: Types.STRING,
      profile_photo: Types.STRING,
      mobile: Types.STRING,
    },
    {
      sequelize,
      modelName: "User",
      tableName: "users",
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );
  return User;
};

export default initUser(connection, DataTypes);
