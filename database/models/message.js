import { Model, DataTypes } from "sequelize";
import connection from "../connection";

const initMessage = (sequelize, Types) => {
  class Message extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    // static associate(models) {
    // 	// define association here
    // }
  }
  Message.init(
    {
      id: {
        type: Types.INTEGER,
        primaryKey: true,
        autoIncrement: true, 
      },
      message: Types.TEXT,
      sender: Types.INTEGER,
      resever: Types.INTEGER,
      file_path: Types.TEXT,
    },
    {
      sequelize,
      modelName: "Message",
      tableName: "messages",
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );
  return Message;
};

export default initMessage(connection, DataTypes);
