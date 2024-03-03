import connection from "@/database/connection";
import { User } from "@/database/models";
import { Message } from "@/database/models";

const { Op } = require("sequelize");

export async function getUsers(id) {
  const users = await User.findAll({
    where: { id: { [Op.not]: id } },
  });
  return users
}

export async function insertMessage(message, sender, resever) {
  return await Message.create({ message, sender, resever });
}

export async function getMessages(sender, resever) {
  const messages = await connection.query(`select t.message,t.sender,t.resever,t.file_path,u.name from messages t
  JOIN users u ON u.id=t.sender 
  WHERE ${resever} IN (t.sender,t.resever) and ${sender} IN (t.sender,t.resever)`)
  return messages[0]
}