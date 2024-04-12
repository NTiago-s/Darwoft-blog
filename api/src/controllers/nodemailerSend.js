import nodemailer from "nodemailer";
export const nodemailerSend = async (email, token) => {
  const confirmLink = `${process.env.BASE_URL}/users/active?token=${token}`;
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.CONFI_EMAIL,
      pass: process.env.CONFI_EMAIL_PASS,
    },
  });
  const mailOptions = {
    from: process.env.CONFI_EMAIL,
    to: email, // correo del cliente
    subject: "Verifica tu correo electronico",
    html: `
        <div  style="max-width: 500px;
        background-color: #eeeeee;
        margin:auto;
        border-radius:6px;
        padding:30px 30px;
        font-size: 20px;
        color:#000;
        ">
        <p>Gracias por crear una cuenta en Autenticos.</p>
        <p>Verifica tu correo electronico para poder ponerte en marcha.</p>
        <br />
        <a href=${confirmLink} style="background-color: #FF22FF;
        border-radius: 4px;
        color: white;
        padding: 15px 32px;
        text-align: center;
        text-decoration: none;
        font-size: 16px;
        margin: 8px 2px;
        cursor: pointer;">Activar Cuenta
        </a>  <br />  <br />
        <p>Cuando hayas verificado tu correo electronico, podras empezar a configurar tu cuenta.</p>
        </div>
        `,
  };
  // Envía el correo electrónico
  await transporter.sendMail(mailOptions);
};

export const resetPassword = async (email, token) => {
  const confirmLink = `${process.env.BASE_URLFRONT}/resetpassword?token=${token}`;
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.CONFI_EMAIL,
      pass: process.env.CONFI_EMAIL_PASS,
    },
  });
  const mailOptions = {
    from: process.env.CONFI_EMAIL,
    to: email, // correo del cliente
    subject: "Cambia tu contraseña",
    html: `
        <div  style="max-width: 500px;
        background-color: #eeeeee;
        margin:auto;
        border-radius:6px;
        padding:30px 30px;
        font-size: 20px;
        color:#000;
        ">
        <p>Para cambiar tu contraseña haz click en este enlace!</p>
        <br />
        <a href=${confirmLink} style="background-color: #FF22FF;
        border-radius: 4px;
        color: white;
        padding: 15px 32px;
        text-align: center;
        text-decoration: none;
        font-size: 16px;
        margin: 8px 2px;
        cursor: pointer;">Cambiar Contraseña
        </a>  <br /> 
        </div>
        `,
  };
  // Envía el correo electrónico
  await transporter.sendMail(mailOptions);
};
