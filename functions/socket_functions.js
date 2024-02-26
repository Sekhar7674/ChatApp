import { User } from "@/database/models";
import { Message } from "@/database/models";

const { Op } = require("sequelize");

export async function getUsers(id){
	const users = await User.findAll({
    where: { id:{[Op.not]:id}  },
  });
  return users
}

export async function insertMessage(message,sender,resever){
	return await Message.create({message,sender,resever});
}