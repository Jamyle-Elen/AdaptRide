import React from "react";
// react-hook-form é a lib pra fazer isso com o form
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import images from "../../../assets/images.js";
// É ele o que vai fazer a requisição HTTP do front para o back
import api from '../../../lib/axios.jsx';
// yup é a biblioteca que valida os dados do form
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
// InputMask é pra formatar os dados do form (Ex: 000.000.000-00 que é o CPF)
import InputMask from 'react-input-mask';
import "./sign-up-driver.css";
// Lib dos alerts personalizados
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Config do yup, pra requerir que todos os campos sejam preenchidos
const schema = yup.object({
  // OBS.: CPF e Telefone estão como string por conta do InputMask (Com ele é obrigatorio que o valor seja string/text)
  name: yup.string().required("Nome obrigatorio"),
  cpf: yup.string().required("CPF obrigatorio"),
  email: yup.string().required("Email obrigatório"),
  phone: yup.string().required("Telefone obrigatorio"),
  date: yup.date().required("Data de nascimento obrigatorio"),
  password: yup.string().required("Senha obrigatorio"),
}).required("Todos os campos devem ser preenchidos");

const SignUpDriver = () => {
  
  const navigate = useNavigate();
  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  function handleCreateDriver(data) {
    // Essa api que envia os dados do form para o db.json
    api.post('/drivers', data)
      .then(() => {
        toast.success('Cadastrado com sucesso!', {
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          className: 'custom-toast-success',
          style: {
            backgroundColor: '#2c3f1b',
            color: '#fff'
            },
          }
        );

        // Redireciona para a tela de login
        navigate('/sign-in/driver');
        reset();
      })
      .catch((error) => {
        toast.error('Erro ao cadastrar!', {
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        console.error(error);
      });
  }

  return (
    <main className="main">
      <section className="section">
        <div className="sign_in_area">
          <img src={images.logoAdapt} alt="Logo Adapt" />
          <div className="sign_in_text">
            <h2>Olá, <span>parceiro!</span> Que bom ver você novamente.</h2>
            <p>Acesse sua conta</p>
          </div>
          <Link to="/sign-in">
            <button className="sign_in_area_button">Entrar</button>
          </Link>
        </div>
        <form onSubmit={handleSubmit(handleCreateDriver)}>
          <div className="sign_up">
            <div className="sign_up_text">
              <h2>Crie sua conta</h2>
              <p>Preencha seus dados</p>
            </div>
            <div className="sign_up_input">
              <input
                type="text"
                name="name"
                id="name"
                placeholder="Ex.: Maria Ferreira Oliveira"
                {...register("name")}
              />
              {errors.name?.message}
              <InputMask
                mask="999.999.999-99"
                maskChar=""
                type="text"
                name="cpf"
                id="cpf"
                placeholder="Ex.: 123.456.789-10"
                {...register("cpf")}
              />
              {errors.cpf?.message}
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Ex.: mariaferreiraoliveira@gmail.com"
                {...register("email")}
              />
              {errors.email?.message}
              <InputMask
                mask="(99) 99999-9999"
                maskChar=""
                type="text"
                name="phone"
                id="phone"
                placeholder="Ex.: +55 81 99999-9999"
                {...register("phone")}
              />
              {errors.phone?.message}
              <input
                type="date"
                name="date"
                id="date"
                placeholder="Ex.: 22/04/1500"
                {...register("date")}
              />
              {errors.date?.message}
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Ex.: #Maria2697V"
                {...register("password")}
              />
              {errors.password?.message}
            </div>
            <button type="submit">Cadastrar</button>
          </div>
        </form>
      </section>
      {/* o ToastContainer é foi chamado na parte debaixo, mas é ele quem exibe o quadradinho la em cima de 'sucess or error' */}
      <ToastContainer />
    </main>
  );
};

export default SignUpDriver;
