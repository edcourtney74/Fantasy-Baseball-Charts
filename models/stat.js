//Create the sequelize object for the stats table
module.exports = function (sequelize, DataTypes) {
    var Stats = sequelize.define("stats", {
        week: {
            type: DataTypes.STRING,
            allowNull: false
        },
        rank: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        team: {
            type: DataTypes.STRING,
            allowNull: false
        },
        points_for: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        points_against: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        wins: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        expected_wins: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        luck: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        h2h_luck: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
    }, {
            freezeTableName: true,
            timestamps: false
        });   

    return Stats;
};