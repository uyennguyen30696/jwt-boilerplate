// Require bcrypt for password hashing
const bcrypt = require("bcryptjs");

// Create User model
module.exports = function(sequelize, DataTypes) {
    const User = sequelize.define("User", {
        firstName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        // The last name can not be null
        lastName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        // The email can not be null, and must be in proper email form before creation
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });
    
    // Create a custom method for User model
    // This will check if an unhasehd password entered by the user can be compared to the hashed password stored in database
    User.prototype.validPassword = function(password) {
        return bcrypt.compareSync(password, this.password);
    };

    // Before a User is created, their password is automatically hashed
    User.addHook("beforeCreate", user => {
        user.password = bcrypt.hashSync(
            user.password,
            bcrypt.genSaltSync(10),
            null
        );
    });

    return User;
};
