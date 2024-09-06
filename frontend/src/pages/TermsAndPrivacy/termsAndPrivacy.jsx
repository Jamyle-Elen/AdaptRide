import { Link } from "react-router-dom";
import "./termsAndPrivacy.css";

const TermsAndPrivacy = () => {
  return (
    <div className="terms-privacy-container">
      <div>
        <div>
          <Link to="/"><i className="bx bx-chevron-left"></i></Link>
        </div>
        <header className="header">
          <h1>Termos de Uso e Política de Privacidade</h1>
        </header>
        <section className="content">
          <div className="contente-itens">
            <h2>1. Introdução</h2>
            <p>
              Bem-vindo ao AdaptRide, uma Aplicação dedicada à solicitação de
              corridas. Este documento descreve os Termos de Uso e a Política de
              Privacidade que regem o uso do nosso site. Ao utilizar nosso site,
              você concorda com os termos descritos abaixo.
            </p>

            <h2>2. Termos de Uso</h2>
            <h3>2.1 Aceitação dos Termos</h3>
            <p>
              Ao acessar e utilizar o site AdaptRide, você concorda em cumprir
              estes Termos de Uso. Se você não concordar com qualquer parte destes
              termos, por favor, não utilize o nosso serviço.
            </p>

            <h3>2.2 Uso do Serviço</h3>
            <p>
              O serviço é oferecido para facilitar a solicitação de corridas para
              pessoas com deficiência ou mobilidades reduzidas. Você concorda em
              usar o serviço de maneira ética, respeitosa e em conformidade com a
              lei.
            </p>

            <h3>2.3 Conta de Usuário</h3>
            <p>
              Para utilizar o serviço, você pode precisar criar uma conta,
              fornecendo informações pessoais como nome, e-mail e telefone. Você é
              responsável por proteger as credenciais de acesso à sua conta e por
              todas as atividades realizadas sob sua conta.
            </p>

            <h3>2.4 Limitação de Responsabilidade</h3>
            <p>
              Embora nos esforcemos para garantir a segurança e a integridade do
              site, não podemos garantir que o serviço será ininterrupto, seguro
              ou livre de erros. Não nos responsabilizamos por qualquer dano
              direto, indireto, incidental ou consequente resultante do uso do
              serviço.
            </p>

            <h2>3. Política de Privacidade</h2>
            <h3>3.1 Coleta de Dados</h3>
            <p>
              Coletamos informações como nome, e-mail, telefone, dados de
              localização e informações sobre as corridas solicitadas. Essas
              informações são usadas para fornecer, melhorar e personalizar o
              serviço.
            </p>

            <h3>3.2 Uso de Dados</h3>
            <p>
              Os dados coletados são utilizados para facilitar a solicitação e
              gestão de corridas, melhorar a experiência do usuário e a eficiência
              do serviço, cumprir obrigações legais e proteger os direitos da
              empresa.
            </p>

            <h3>3.3 Compartilhamento de Dados</h3>
            <p>
              Compartilhamos suas informações pessoais apenas com parceiros
              necessários para a prestação do serviço, como motoristas ou
              provedores de pagamento. Podemos divulgar suas informações se
              exigido por lei ou em resposta a solicitações legais válidas.
            </p>

            <h3>3.4 Segurança dos Dados</h3>
            <p>
              Implementamos medidas de segurança robustas para proteger seus dados
              contra acesso não autorizado, alteração, divulgação ou destruição.
              Em caso de vazamento de dados, tomaremos as medidas necessárias para
              mitigar os danos e informaremos os usuários afetados conforme
              exigido por lei.
            </p>

            <h3>3.5 Retenção de Dados</h3>
            <p>
              Reteremos suas informações pessoais pelo tempo necessário para
              fornecer o serviço, cumprir nossas obrigações legais ou resolver
              disputas.
            </p>

            <h3>3.6 Direitos dos Usuários</h3>
            <p>
              Você tem o direito de acessar, corrigir, excluir e revogar o
              consentimento para o uso de suas informações pessoais a qualquer
              momento.
            </p>

            <h3>3.7 Cookies e Tecnologias Semelhantes</h3>
            <p>
              Utilizamos cookies e tecnologias semelhantes para melhorar a
              funcionalidade do site e a experiência do usuário.
            </p>

            <h3>3.8 Alterações a esta Política</h3>
            <p>
              Podemos atualizar esta Política de Privacidade periodicamente.
              Notificaremos você sobre quaisquer alterações significativas por
              meio do site ou por outros meios apropriados.
            </p>

            <h3>3.9 Contato</h3>
            <p>
              Se você tiver dúvidas sobre esta Política de Privacidade ou quiser
              exercer seus direitos, entre em contato conosco através do e-mail:
              support@adaptride.com .
            </p>
            <span>© 2024 AdaptRide. Todos os direitos reservados.</span>
          </div>
        </section>
      </div>
    </div>
  );
};

export default TermsAndPrivacy;
