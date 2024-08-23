import React from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import images from "../../../assets/images";
import api from "../../../../../frontend/config/axios.jsx";
import InputMask from "react-input-mask";
import "./sign-up.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { sucessToast, errorToast } from "../../../utils/toastUtils.jsx";
import { validateSchema } from "../../../validators/validationSchemaP.jsx";

const SignUp = () => {
  const [step, setStep] = useState(1);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    if (step === 2) {
      await handleCreatePassenger(data);
    } else {
      setStep(step + 1);
    }
  };
  const handleCreatePassenger = async (data) => {
    try {
      const {
        name
      } = data;

      const transformedName = name
        .toLowerCase()
        .replace(/\b\w/g, (letter) => letter.toUpperCase());
      data.name = transformedName;

      // validações dos campos
      await validateSchema.validate(data, { abortEarly: false });

      const response = await api.post("/register/passengers", data);
      sucessToast("Cadastrado com sucesso!");
      // verificar se o tempo ta legal ou ta mt longo
      await new Promise((resolve) => setTimeout(resolve, 500));
      navigate("/sign-in/driver");
      reset();

      // volta para a tela de login
    } catch (error) {
      if (error.name === "ValidationError") {
        errorToast(`Erros de validação: ${error.errors.join(", ")}`);
      } else {
        errorToast("Falha ao cadastrar, tente novamente!");
      }
      console.error(error);
      setStep(step - 1);
    }
  };

  const goBack = () => {
    step > 1 ? setStep(step - 1) : null;
  };

  return (
    <main className="main">
      <section className="section">
        <div className="sign_in_area">
          <img src={images.logoAdapt} alt="Logo Adapt" />
          <div className="sign_in_text">
            <h2>
              Olá, <span>passageiro!</span> Que bom ver você novamente.
            </h2>
            <p>Acesse sua conta</p>
          </div>
          <Link to="/sign-in">
            <button className="sign_in_area_button">Entrar</button>
          </Link>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="sign_up">
            <div className="sign_up_text">
              <h2>Crie sua conta</h2>
              <p>Preencha seus dados</p>
            </div>
            <div className="sign_up_input">
              {step === 1 && (
                <>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    placeholder="Nome"
                    {...register("name", { required: true })}
                    className={errors.name ? "input-error" : ""}
                  />
                  {errors.name?.message}
                  <InputMask
                    mask="999.999.999-99"
                    maskChar=""
                    type="text"
                    name="cpf"
                    id="cpf"
                    placeholder="CPF"
                    {...register("cpf", { required: true })}
                    className={errors.cpf ? "input-error" : ""}
                  />
                  <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Email"
                    {...register("email", { required: true })}
                    className={errors.email ? "input-error" : ""}
                  />
                  <InputMask
                    mask="(99) 99999-9999"
                    maskChar=""
                    type=""
                    name="phone"
                    id="phone"
                    placeholder="Telefone"
                    {...register("phone", { required: true })}
                    className={errors.phone ? "input-error" : ""}
                  />
                  <input
                    type="date"
                    name="dateBirth"
                    id="dateBirth"
                    {...register("date", { required: true })}
                    className={errors.date ? "input-error" : ""}
                  />
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Senha"
                    {...register("password", { required: true })}
                    className={errors.password ? "input-error" : ""}
                  />
                </>
              )}
              {/* // motorista ser achado aleatoriamente, login do passageiro
// tela de login mandar p profile
// cadastro do passageiro
// solicitação de uma corrida

// O AdaptRRide surge com a proposta de oferecer melhores condições de mobilidade atraves de uma aplicação onde o 
                

// info pessoais
// endereço
tiopode deficienci equipamentosde mobilidade
necessidade de acompanhante
info medicas importantes

                 */}
              {step === 2 && (
                <>
                  <p>Acessibilidade</p>
                  <InputMask
                    mask="(99) 99999-9999"
                    maskChar=""
                    type="text"
                    name="emergencyContact"
                    id="emergencyContact"
                    placeholder="Contato de Emergência"
                    {...register("emergencyContact", { required: true })}
                    className={errors.emergencyContact ? "input-error" : ""}
                  />
                  <input
                    type="text"
                    name="contactName"
                    id="contactName"
                    placeholder="Nome do contato de Emergência"
                    {...register("contactName", { required: true })}
                    className={errors.contactName ? "input-error" : ""}
                  />

                  <select
                    name="disability"
                    id="disability"
                    {...register("disability", { required: true })}
                    className={errors.disability ? "input-error" : ""}
                  >
                    <option value="">Selecione sua Deficiência</option>
                    <option value="Nenhuma">Nenhuma</option>
                    <option value="Deficiente visual">Deficiente visual</option>
                    Auditiva
                    <option value="Deficiente fisico">Deficiente fisico</option>
                    <option value="Deficiente Intelectual">
                      Deficiente Intelectual
                    </option>
                    <option value="Deficiente mental">Deficiente mental</option>
                    Intelectual
                    <option value="Deficiente Psicossocial ou por Saúde Mental">
                      Deficiente Psicossocial ou por Saúde Mental
                    </option>
                  </select>

                  <select
                    name="assistanceLevel"
                    id="assistanceLevel"
                    {...register("assistanceLevel", { required: true })}
                    className={errors.assistanceLevel ? "input-error" : ""}
                  >
                    <option value="">Selecione seu Nivel de Assistência</option>
                    <option value="Nenhuma">Nenhuma</option>
                    <option value="Minima">Assistência mínima</option>
                    <option value="Média">Assistência moderada</option>
                    <option value="Completa">Assistência completa</option>
                  </select>

                  <input
                    type="text"
                    name="specialEquipment"
                    placeholder="Equipamentos especiais (ex: cadeira de rodas)"
                    {...register("specialEquipment")}
                    className={errors.specialEquipment ? "input-error" : ""}
                  />

          
                </>
              )}
            </div>
            <div className="form_navigation">
              {step > 1 && (
                <button type="button" onClick={goBack}>
                  <span>
                    <i className="bx bx-chevron-left"></i>
                  </span>
                </button>
              )}
              <button type="submit">
                {step === 2 ? (
                  "Cadastrar"
                ) : (
                  <span>
                    <i className="bx bxs-chevron-right"></i>
                  </span>
                )}
              </button>
            </div>
          </div>
        </form>
      </section>
      <ToastContainer />
    </main>
  );
};

export default SignUp;
