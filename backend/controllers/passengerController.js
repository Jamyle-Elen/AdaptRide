import db from "../config/database.js";
import Passenger from '../models/Passenger.Model.js'
import bcrypt from "bcrypt";

export const createPassenger = async (req, res) => {
    try {
        const {
        name,
        cpf,
        email,
        phone,
        date,
        password,
        emergencyContact,
        contactName,
        disability,
        assistanceLevel,
        specialEquipment
        } = req.body;

        const cpfExists = await Passenger.findOne({
        where: { cpf },
        });

        if (cpfExists) {
        return res.status(400).json({ message: "Usuário já cadastrado" });
        }


        const hashedPassword = await bcrypt.hash(password, 10);

        const newPassenger = await Passenger.create({
        name,
        cpf,
        email,
        phone,
        date,
        password: hashedPassword,
        emergencyContact,
        contactName,
        disability,
        assistanceLevel,
        specialEquipment
        });

        res.status(201).json(newPassenger);
    } catch (error) {
    res.status(500).json({ message: "Erro ao tentar cadastrar passageiro" });
  }
};

export const loginPassenger = async (req, res) => {
  try {
    const { email, password } = req.body

    const passenger = await Passenger.findOne({
      where: { email }
    })
      if (!passenger) {
        return res.status(400).json({ message: "Passageiro não cadastrado" })
      }
      const isPassword = await bcrypt.compare(password, passenger.password)
        if (!isPassword) {
          return res.status(400).json({ message: "Senha incorreta" })
        }
    return res.status(200).json({ message: "Login bem sucedido!", passenger })
  } catch (error) {
    return res.status(500).json({ message: "Erro ao tentar logar" })
  }
}
