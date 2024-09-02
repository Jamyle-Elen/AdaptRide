import * as yup from "yup";
import { cpf as cpfValidator } from "cpf-cnpj-validator";
import validator from "validator";
import { differenceInYears } from "date-fns";

export const validateSchema = yup.object().shape({
  name: yup
    .string()
    .min(3)
    .matches(/^\S+(\s\S+)+$/, "Seu nome é muito curto")
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
    .test("is-of-age", "Você deve ter ao menos 18 anos", (value) => {
      return differenceInYears(new Date(), new Date(value)) >= 18;
    })
    .required("Data de nascimento é obrigatória"),

  password: yup
    .string()
    .min(8, "A senha deve ter ao menos 8 caracteres")
    .required("Senha é obrigatória"),

    emergencyContact: yup
    .string()
    .matches(/^\(\d{2}\) \d{5}-\d{4}$/, "Telefone inválido")
    .required("Contato de emergência é obrigatório"),

    contactName: yup
    .string()
    .min(3)
    .matches(/^\S+(\s\S+)+$/, "Nome do contato muito curto")
    .required("Nome é do contato de emergência é obrigatório"),

    disability: yup
    .string()
    .required("Deficiência é obrigatória"),

  descriptionAdaptations: yup
  .string(),
});
