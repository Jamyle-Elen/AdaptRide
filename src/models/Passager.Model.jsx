// id (vou usar o uuidv4), nome, cpf, email, tel, data de nascimento, senha
import mysql from 'mysql2'
import sequelize from 'sequelize'
import { v4 as uuidv4 } from 'uuid';

class Passenger {
    constructor(name, cpf, email, tel, birthDate, password) {
      this.id = uuidv4();
      this.name = name;
      this.cpf = cpf;
      this.email = email;
      this.tel = tel;
      this.birthDate = birthDate;
      this.password = password;
    }
}

// sequelize 