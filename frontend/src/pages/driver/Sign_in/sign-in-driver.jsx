import React from "react";
import images from "../../../assets/images.js";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { api } from "../../../../../frontend/config/axios.js";
import "./sign-in-driver.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { errorToast, sucessToast } from "../../../utils/toastUtils.jsx";

const SignInDriver = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await api.post("/login/driver", data);
      const userData = response.data;
      const id = response.data.id;
      console.log(response.data)
      sucessToast("Login realizado com sucesso!");
      navigate(`/teste/${id}`, { state: userData });
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        errorToast(error.response.data.message);
      } else {
        errorToast("Falha ao realizar login, tente novamente!");
      }
      reset();
      console.error("Erro ao fazer login:", error.response ? error.response.data : error.message);
    }
  };

  return (
    <>
      <main className="main">
        <form onSubmit={handleSubmit(onSubmit)}>
          <section className="section">
            <div className="sign-in">
              <div className="sign-in-text">
                <h2>Login</h2>
                <p>Insira seus dados</p>
              </div>
              <div className="sign-in-input">
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="E-mail"
                  {...register("email")}
                  className={errors.email ? "input-error" : ""}
                />
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Senha"
                  {...register("password")}
                  className={errors.password ? "input-error" : ""}
                />
                <Link to="/forgot-password">
                  <p>Esqueci minha senha</p>
                </Link>
              </div>
              <button type="submit" className="profile-passenger">
                Entrar
              </button>
            </div>
            <div className="sign-up-area">
              <img src={images.logoAdapt} alt="Logo Adapt" />
              <div className="sign-up-text">
                <h2>Ainda não possui conta?</h2>
                <p>Crie sua conta</p>
              </div>
              <Link to="/sign-up/driver">
                <button type="submit" className="sign-up-area-button">
                  Cadastrar
                </button>
              </Link>
            </div>
          </section>
          <ToastContainer/>
        </form>
      </main>
    </>
  );
};

export default SignInDriver;
