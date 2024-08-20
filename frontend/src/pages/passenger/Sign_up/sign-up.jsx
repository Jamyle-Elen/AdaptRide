import React from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useState } from 'react'
import images from "../../../assets/images";
import api from "../../../../../frontend/config/axios.jsx";
import InputMask from "react-input-mask";
import "./sign-up.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { sucessToast, errorToast } from "../../../utils/toastUtils.jsx";

const SignUp = () => {
  const [step, setStep] = useState(1)
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  
  const goBack = () => {
    step > 1 ? setStep(step - 1) : null;
  };

  const onSubmit = async (data) => {
    if (step === 2) {
      await handleCreatePassenger(data);
    } else {
      setStep(step + 1);
    }
  }

  const handleCreatePassenger = async (data) => {
    try {
      let {
        name,
        cpf: cpfNumber,
        email,
        phone,
        date,
        password,
        
      } = data;

      const transformedName = name
        .toLowerCase()
        .replace(/\b\w/g, (letter) => letter.toUpperCase());
      data.name = transformedName;

      if (!name) {
        console.log('Nome deve ter ao menos 2 palavras')
        return;
      }

      else {
        const response = await api.post("/register/passenger", data);
        sucessToast("Cadastrado com sucesso!");
        reset();
        navigate("/sign-in");
      }
    } catch (error) {
      errorToast("Falha ao cadastrar, tente novamente!");
      console.error(error);
      reset();
      setStep(step - 1);
    }
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
                {step === 2 && (
                  <>
                  <input
                  type="text"
                  name="dateBirth"
                  id="dateBirth"
                  {...register("date", { required: true })}
                  className={errors.text ? "input-error" : ""}
                />
                <select
                    name="teste"
                    id="teste"
                    {...register("teste", { required: true })}
                    className={errors.teste ? "input-error" : ""}
                  >
                    <option value="">Selecione sua Deficiencia</option>
                    <option value="Deficiente visual">Deficiente visual</option>
                    <option value="Deficiente fisico">Deficiente fisico</option>
                  </select>
                  <select
                    name="teste2"
                    id="teste2"
                    {...register("teste2", { required: true })}
                    className={errors.teste2 ? "input-error" : ""}
                  >
                    <option value="">Teste</option>
                    <option value="teste">teste</option>
                    <option value="teste2">teste2</option>
                  </select>
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
      <ToastContainer/>
    </main>
  );
};

export default SignUp;
