const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const Schema = mongoose.Schema;

const userSchema = new Schema(
	{
		email: { type: String, required: true, unique: true, trim: true },
		password: { type: String, required: true, trim: true },
		name: { type: String, required: true },
		lastName: { type: String, required: true },
		region: {
			type: String,
			enum: [
				"Andalucía",
				"Aragón",
				"Islas Baleares",
				"Canarias",
				"Cantabria",
				"Castilla-La Mancha",
				"Castilla y León",
				"Cataluña",
				"Comunidad de Madrid",
				"Comunidad Foral de Navarra",
				"Comunidad Valenciana",
				"Extremadura",
				"Galicia",
				"País Vasco",
				"Principado de Asturias",
				"Región de Murcia",
				"La Rioja",
        "Ceuta",
        "Melilla"
			],
			required: true,
		},
		rol: { type: String, enum: ["admin", "user"], default: "user" },
	},
	{
		timestamps: true,
	}
);

userSchema.pre("save", function (next) {
	this.password = bcrypt.hashSync(this.password, 10);
	next();
});

const User = mongoose.model("users", userSchema);

module.exports = User;
