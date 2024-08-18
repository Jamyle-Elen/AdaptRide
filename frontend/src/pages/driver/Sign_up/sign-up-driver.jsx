import React from "react";
// react-hook-form é a lib pra fazer isso com o form
import { useForm } from "react-hook-form";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import images from "../../../assets/images.js";
// É ele o que vai fazer a requisição HTTP do front para o back
import api from "../../../../../frontend/config/axios.jsx";
// yup é a biblioteca que valida os dados do form

// InputMask é pra formatar os dados do form (Ex: 000.000.000-00 que é o CPF)
import InputMask from "react-input-mask";
import "./sign-up-driver.css";
// Lib dos alerts personalizados
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { sucessToast, errorToast } from "../../../utils/toastUtils.jsx";

const SignUpDriver = () => {
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
      await handleCreateDriver(data);
      
    } else {
      setStep(step + 1);
    }
  };
  const handleCreateDriver = async (data) => {
    try {
    const { name, cpf, email, phone, date, password, numCNH, vehiclePlate, vehicleBrand, vehicleYear, vehicleColor, typesAdaptations, totalCapacity, descriptionAdaptations } = data;
      const transformedName = name.toLowerCase().replace(/\b\w/g, (letter) => letter.toUpperCase());
      data.name = transformedName;
      // const emailRegex = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/gi
      // validador do cpf
      // function nameValidator(event) {
      //   const nameOnChage = 
      //   if (name.length < 3) {
      //     console.log("Nome muito curto");
      //   }
      // }
      if (cpf.length < 11) {
        console.log('CPF obrigatório');       
      } else {
        const response = await api.post("/drivers", data);
        sucessToast("Cadastrado com sucesso!");
        // volta para a tela de login
        reset()
        navigate("/sign-in/driver");
      }

      

    } catch (error) {
      errorToast("Falha ao cadastrar, tente novamente!");
      console.error(error);
      reset();
      // navigator('/sign-up/driver')
      setStep(step - 1)
    }
  };

  // /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/gi              valiação do email, email regex
  // voltar
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
              Olá, parceiro! Que bom ver você novamente.
            </h2>
            <p>Acesse sua conta</p>
          </div>
          <Link to="/sign-in/driver">
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
                    className={
                      errors.name
                        ? "input-error"
                        : ""
                    }
                  />
                  <InputMask
                    mask="999.999.999-99"
                    maskChar=""
                    type="text"
                    name="cpf"
                    id="cpf"
                    placeholder="CPF"
                    {...register("cpf", { required: true })}
                    className={
                      errors.cpf ? "input-error" : ""
                    }
                  />
                  <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Email"
                    {...register("email", { required: true })}
                    className={
                      errors.email
                        ? "input-error": ""
                    }
                  />
                  <InputMask
                    mask="(99) 99999-9999"
                    maskChar=""
                    type="text"
                    name="phone"
                    id="phone"
                    placeholder="Telefone"
                    {...register("phone", { required: true })}
                    className={
                      errors.phone
                        ? "input-error" : ""
                    }
                  />
                  <input
                    type="date"
                    name="date"
                    id="date"
                    {...register("date", { required: true })}
                    className={
                      errors.date
                        ? "input-error" : ""
                    }
                  />
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Senha"
                    {...register("password", { required: true })}
                    className={
                      errors.password
                        ? "input-error" : ""
                    }
                  />
                </>
              )}
              {step === 2 && (
                <>
                  {/* cadastrar veiculo */}
                  <p>Informações do Veículo:</p>
                  <input
                    type="text"
                    name="numCNH"
                    id="numCNH"
                    placeholder="Número da CNH"
                    {...register("numCNH", { required: true })}
                    className={errors.numCNH ? "input-error" : ""}
                  />
                  <input
                    type="text"
                    name="vehiclePlate"
                    placeholder="Placa do Veículo"
                    {...register("vehiclePlate")}
                  />
                   <select
                    name="vehicleBrand"
                    id="vehicleBrand"
                    {...register("vehicleBrand", { required: true })}
                    className={errors.vehicleBrand ? "input-error" : ""}
                  >
                    <option value="">Selecione a Marca</option>
                    <option value="Fiat">Fiat</option>
                    <option value="Honda">Honda</option>
                    <option value="Toyota">Toyota</option>
                  </select>

                   {/* <select name="vehicleModel" id="vehicleModel">
                    <option value="">Selecione o Modelo</option>{" "} 
                    {/* dinamico */}
                  {/* </select>  */}
                  <select
                    name="vehicleYear"
                    id="vehicleYear"
                    {...register("vehicleYear", { required: true })}
                    className={errors.vehicleYear ? "input-error" : ""}
                  >
                    <option value="">Selecione o Ano</option>
                    <option value="2025">2025</option>
                    <option value="2024">2024</option>
                    <option value="2023">2023</option>
                  </select>

                  <select
                    name="vehicleColor"
                    id="vehicleColor"
                    {...register("vehicleColor", { required: true })}
                    className={errors.vehicleColor ? "input-error" : ""}
                  >
                    <option value="">Selecione a Cor</option>
                    <option value="Vermelho">Vermelho</option>
                    <option value="Preto">Preto</option>
                  </select>
                  <select
                    name="typesAdaptations"
                    id="typesAdaptations"
                    {...register("typesAdaptations", { required: true })}
                    className={errors.typesAdaptations ? "input-error" : ""}
                  >
                    <option value="">Selecione as Adaptações</option>
                    <option value="Rampa de acesso">Rampa de acesso</option>
                    <option value="Espaço para cadeira de rodas">Espaço para cadeira de rodas</option>
                  </select>
                  <select
                    name="totalCapacity"
                    id="totalCapacity"
                    {...register("totalCapacity", { required: true })}
                    className={errors.totalCapacity ? "input-error" : ""}
                  >
                    <option value="">Selecione Capacidade Total</option>
                    <option value="1">1</option>
                    <option value="1">2</option>
                  </select>
                  <textarea name="descriptionAdaptations" id="" {...register("descriptionAdaptations")}></textarea>
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

export default SignUpDriver;
