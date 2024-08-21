import db from "../config/database.js";
import Driver from '../models/Driver.Model.js'
import bcrypt from "bcrypt";

export const createDrivers = async (req, res) => {
    try {
      // aqui eu to destruturando
        const {
        name,
        cpf,
        email,
        phone,
        date,
        password,
        numCNH,
        vehiclePlate,
        vehicleBrand,
        vehicleYear,
        vehicleColor,
        typesAdaptations,
        totalCapacity,
        descriptionAdaptations,
        } = req.body;

        // verifica se o cpf ja ta cadastrado
        const cpfExists = await Driver.findOne({
        where: { cpf },
        });
        // se existir
        if (cpfExists) {
        return res.status(400).json({ message: "Usuário já cadastrado" });
        }

        // função pra criptografar a senha (igual o professor disse na aula sobre os que é gerado varios e varios numeros e se ainda que as senham cadastradas sejam a mesma o hash é diferente)
        const hashedPassword = await bcrypt.hash(password, 10);

        // criar o motorista
        const newDriver = await Driver.create({
        name,
        cpf,
        email,
        phone,
        date,
        password: hashedPassword,
        numCNH,
        vehiclePlate,
        vehicleBrand,
        vehicleYear,
        vehicleColor,
        typesAdaptations,
        totalCapacity,
        descriptionAdaptations,
        });

        res.status(201).json(newDriver);
    } catch (error) {
    res.status(500).json({ message: "Erro ao tentar cadastrar motorista" });
  }
};

export const loginDriver = async (req, res) => {
  try {
    // pega email e password
    const { email, password } = req.body
    // findOne ele é usado pra pegar as informações do banco de dados where = onde tiver o 'email'
    const driver = await Driver.findOne({
      where: { email }
    })
      if (!driver) {
        return res.status(400).json({ message: "Motorista não cadastrado" })
      }
      // aqui é pra comparar a senha da pessoa com a senha do hash
      const isPassword = await bcrypt.compare(password, driver.password)
        if (!isPassword) {
          return res.status(400).json({ message: "Senha incorreta" })
        }
    return res.status(200).json({ message: "Login bem sucedido!", driver })
  } catch (error) {
    return res.status(500).json({ message: "Erro ao tentar logar" })
  }
}

export const getDriverInfo = async (req, res) => {
  try {
    const { id } = req.params;

    const driver = await Driver.findOne({
      where: { id },
      attributes: [
        'name',
        'cpf',
        'email',
        'phone',
        'date',
        'numCNH',
        'vehiclePlate',
        'vehicleBrand',
        'vehicleYear',
        'vehicleColor',
        'typesAdaptations',
        'totalCapacity',
        'descriptionAdaptations'
      ]
    });

    if (!driver) {
      return res.status(404).json({ error: 'Motorista não encontrado.' });
    }

    res.status(200).json(driver);
  } catch (error) {
    res.status(500).json({ error: 'Ocorreu um erro ao buscar as informações do motorista.', error });
  }
};
