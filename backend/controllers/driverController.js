import db from "../config/database.js";
import Driver from "../models/Driver.Model.js";
import bcrypt from "bcrypt";
import ngeohash from "ngeohash";

export const createDrivers = async (req, res) => {
  try {
    function getRandomPointInCircle(center, radius) {
      const randomRadius = Math.sqrt(Math.random()) * radius;
      const angle = Math.random() * 2 * Math.PI;
      const latOffset = (randomRadius * Math.cos(angle)) / 111300;
      const lonOffset =
        (randomRadius * Math.sin(angle)) /
        (111300 * Math.cos((center.latitude * Math.PI) / 180));
      return {
        latitude: center.latitude + latOffset,
        longitude: center.longitude + lonOffset,
      };
    }

    const setLocationRandom = () => {
      const center = { latitude: -8.0476, longitude: -34.877 };
      const radius = 10000;
      return getRandomPointInCircle(center, radius);
    };

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

    const cpfExists = await Driver.findOne({ where: { cpf } });
    if (cpfExists)
      return res.status(400).json({ message: "Usuário já cadastrado (CPF)" });

    const emailExists = await Driver.findOne({ where: { email } });
    if (emailExists)
      return res.status(400).json({ message: "Usuário já cadastrado (EMAIL)" });

    const cnhExists = await Driver.findOne({ where: { numCNH } });
    if (cnhExists)
      return res.status(400).json({ message: "Usuário já cadastrado (CNH)" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const { latitude, longitude } = setLocationRandom();
    console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);

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
      vehicleYear: parseInt(vehicleYear),
      vehicleColor,
      typesAdaptations,
      totalCapacity: parseInt(totalCapacity),
      descriptionAdaptations,
      locationZone: ngeohash.encode(latitude, longitude, 12),
    });

    res.status(201).json(newDriver);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erro ao tentar cadastrar, tente mais tarde", error });
  }
};

export const loginDriver = async (req, res) => {
  try {
    const { email, password } = req.body;
    const driver = await Driver.findOne({ where: { email } });
    if (!driver) {
      return res.status(400).json({ message: "Motorista não cadastrado", error });
    }
    const isPasswordValid = await bcrypt.compare(password, driver.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Email ou senha inválidos", error });
    }

    return res.status(200).json({
      message: "Login bem sucedido!",
      driver: {
        id: driver.id,
        email: driver.email,
        name: driver.name,
      }});
  } catch (error) {
    console.error("Erro ao tentar logar:", error.message);
    res.status(500).json({ message: "Erro ao tentar logar" });
  }
};

export const getDriverInfo = async (req, res) => {
  try {
    const { id } = req.params;
    const driver = await Driver.findOne({
      where: { id },
      attributes: [
        "name",
        "cpf",
        "email",
        "phone",
        "date",
        "numCNH",
        "vehiclePlate",
        "vehicleBrand",
        "vehicleYear",
        "vehicleColor",
        "typesAdaptations",
        "totalCapacity",
        "descriptionAdaptations",
      ],
    });

    if (!driver)
      return res.status(404).json({ error: "Motorista não encontrado." });

    res.status(200).json(driver);
  } catch (error) {
    res
      .status(500)
      .json({
        error: "Ocorreu um erro ao buscar as informações do motorista.",
        error,
      });
  }
};
