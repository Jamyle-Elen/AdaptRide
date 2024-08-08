import React from "react";
import { useForm } from "react-hook-form";
// Biblioteca utuilizada para enviar os dados do formulário
import { Link, useNavigate } from "react-router-dom";
import images from "../../../assets/images";
import axios from 'axios';
// Axios é quem faz a requisição HTTP do front para o back
import api from '../../../lib/axios.jsx';
// Arquivo onde o Axios ta configurado
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import InputMask from 'react-input-mask'
import "./sign-up.css";

const schema = yup.object({
  name: yup.string().required("Nome obrigatorio"),
  cpf: yup.string().required("CPF obrigatorio"),
  email: yup.string().required("Email obrigatório"),
  phone: yup.string().required("Telefone obrigatorio"),
  date: yup.date().required("Data de nascimento obrigatorio"),
  password: yup.string().required("Senha obrigatorio"),
  // Validação dos dados do form
})
.required("Todos os campos devem ser preenchidos");

const SignUp = () => {
  
  const navigate = useNavigate();
  // Vai redirecionar para a pagina de login, pra que ele já entre em sua conta

  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  function handleCreatePassager(data) {
    api.post('/passengers', data)
    console.log('Cadastrado com sucesso!')
    navigate('/sign-in')
    reset()
  }

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
      <form onSubmit={handleSubmit(handleCreatePassager)}>
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
                type=""
                name="phone"
                id="phone"
                placeholder="Ex.: +55 81 99999-9999"
                {...register("phone")}
              />
              {errors.phone?.message}

              <input
                type="date"
                name="dateBirth"
                id="dateBirth"
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
    </main>
  );

};

// const SignUp2 = () => {
//     return (
//       <>
//         <form action="http://localhost:3000/home/register" method="POST">
//             <input type="text" name="name" />
//             <input type="email" name="email" />
//             <button type="submit">Enviar</button>
//         </form>

//       </>
//     )
//   }

export default SignUp;
