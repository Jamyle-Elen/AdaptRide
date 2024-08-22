import * as yup from "yup";
import { cpf as cpfValidator } from "cpf-cnpj-validator";
import validator from "validator";

export const validateSchema = yup.object().shape({
  name: yup
    .string()
    .min(3)
    .matches(/^\S+(\s\S+)+$/, "Nome muito curto")
    .required("Nome é obrigatório"),

  cpf: yup
    .string()
    .test("is-valid-cpf", "CPF inválido", (value) =>
      cpfValidator.isValid(value)
    )
    .required("CPF é obrigatório"),

  email: yup
    .string()
    .email("E-mail inválido")
    .test("is-valid-email", "E-mail inválido", (value) =>
      validator.isEmail(value)
    )
    .required("E-mail é obrigatório"),

  phone: yup
    .string()
    .matches(/^\(\d{2}\) \d{5}-\d{4}$/, "Telefone inválido")
    .required("Telefone é obrigatório"),

  date: yup
  .date()

  .required("Data de nascimento é obrigatória"),

  password: yup
    .string()
    .min(8, "A senha deve ter ao menos 8 caracteres")
    .required("Senha é obrigatória"),

  numCNH: yup
    .string()
    .min(11, "CNH inválida")
    .required("Número da CNH é obrigatório"),

  vehiclePlate:yup
  .string()
  .min(7,)
  .max(7)
  .required("Placa do veículo é obrigatória"),

  vehicleBrand: yup
  .string()
  .required("Marca do veículo é obrigatória"),

  vehicleYear: yup
  .string()
  .required("Ano do veículo é obrigatório"),

  vehicleColor: yup
  .string()
  .required("Cor do veículo é obrigatória"),

  typesAdaptations: yup
  .string()
  .required("Adaptações são obrigatórias"),

  totalCapacity: yup
  .number()
  .required("Capacidade total é obrigatória"),

  descriptionAdaptations: yup
  .string(),
});
