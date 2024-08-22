import "./helpmessage.css";
import images from "../../assets/images";

const HelpMessage = () => {
  return (
    <div className="help">
      <div className="help-page">
        <div className="help-text-center">
          <h1>Bem-vindo ao Suporte AdaptRide</h1>
          <p>
            Estamos aqui para ajudar você! Se precisar de suporte, veja os
            recursos e opções de contato disponíveis abaixo. Estamos prontos
            para atender suas necessidades e garantir que você tenha a melhor
            experiência possível.
          </p>
        </div>
      </div>
      <div className="help-mail">
        <img src={images.iconMail} alt="icon-mail" />
        <p>support@adaptride.com</p>
      </div>
      <div className="image-help">
        <img src={images.imageHelp} alt="image-help" />
      </div>
    </div>
  );
};

export default HelpMessage;
