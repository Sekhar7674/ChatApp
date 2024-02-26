import jwt from "jsonwebtoken";

export default async (req, res) => {
	if (!("authorization" in req.headers)) {
		return res.status(401).json({ message: "No autorization token" });
	}
	switch (req.method) {
		case "GET":
			await userGetById(req, res);
			break;
		default:
			res.status(405).json({
				message: `Method ${req.method} not allowed`,
			});
	}
};

const userGetById = async (req, res) => {
	try {
		const {dataValues} = jwt.verify(
			req.headers.authorization,
			process.env.JWT_SECRET
		);

		res.status(200).json({user:dataValues });
	} catch (e) {
		console.log(e)
		res.status(400).json({
			error_code: "get_user_by_id",
			message: e.message,
		});
	}
};
