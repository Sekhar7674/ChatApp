export default {
	development: {
		username: process.env.DB_USERNAME || "root",
		database: process.env.DB_NAME || "chat",
		password: process.env.DB_PASSWORD || "",
		host: process.env.DB_HOSTNAME || "localhost",
		port: process.env.DB_PORT || 3306,
		dialect: "mysql",
		logging: false,
	},
	production: {
		username: process.env.DB_USERNAME || "root",
		database: process.env.DB_NAME || "chat",
		password: process.env.DB_PASSWORD || "",
		host: process.env.DB_HOSTNAME || "localhost",
		port: process.env.DB_PORT || 3306,
		logging: false,
		dialect: "mysql",
	},
};
