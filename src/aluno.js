import database from "./db.js";
import Sequelize from "sequelize";

const Aluno = database.define('aluno', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },

    matricula: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: true
    },

    nome: {
        type: Sequelize.STRING,
        allowNull: false
    },

    dataDeNascimento: Sequelize.STRING,

    email: Sequelize.STRING,

    status: Sequelize.STRING
});

export default Aluno;
