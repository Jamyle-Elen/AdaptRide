import React from "react";
import "./footer.css";
import images from "../../assets/images";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <>
      <footer className="footer">
        <div className="firstColumn">
          <div className="logoFooter">
            <img src={images.logoAdapt} alt="Logo Footer" />
            <h3>Central de ajuda</h3>
          </div>
          <div className="footerLinks">
            <h3>Saiba mais:</h3>
            <ul className="footer-ul">
              <li>
                <Link className="footer-List" to="/aboutpage">
                  Quem somos?
                </Link>
              </li>
              {/* <li>
              <Link className="footer-List" to="/">
                O que fazemos
              </Link>
            </li>
            <li>
              <Link className="footer-List" to="/">
                Onde vamos
              </Link>
            </li> */}
            </ul>
          </div>
        </div>
        <div className="QrCodeAppInfo">
          <img className="QrCodeApp" src={images.qrcodeApp} alt="QR Code App" />
          <h3>Baixe Agora</h3>
          <p>Leia o QR Code e baixe o aplicativo</p>
        </div>
        <div className="QrCodeParceiroInfo">
          <img
            className="QrCodeParceiro"
            src={images.qrcodeParceiro}
            alt="QR Code Parceiro"
          />
          <h3>Seja parceiro</h3>
          <p>Apoie esta causa, seja parceiro</p>
        </div>
        {/* <div className="Arrow">
        <img src={images.arrowAdapt} alt="Arrow" />
      </div> */}
      </footer>
      <div className="sub-footer">
      </div>
    </>
  );
}

export default Footer;
