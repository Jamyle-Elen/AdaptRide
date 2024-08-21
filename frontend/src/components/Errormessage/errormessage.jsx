import images from "../../assets/images";
import "./errormessage.css";

const ErrorMessage= () => {
  return (
    <div className="notfound">
      <div className="Title-NotFound">
        <h1>Página Não Encontrada</h1>
        <p>Desculpe, a página que você está procurando não existe.</p>
      </div>
      <div className="imageError">
        <img src={images.notFound} alt="NotFound" />
      </div>
    </div>
  );
}

export default ErrorMessage;
