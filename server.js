const express = require("express");
const bodyParser = require("body-parser");
const multer = require("multer");
const path = require("path");
const nodemailer = require("nodemailer");

const app = express();
const PORT = 3000;

// Middleware para servir arquivos estáticos
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

// Configuração do multer para upload de arquivos
const upload = multer({
  dest: "uploads/",
  fileFilter: (req, file, cb) => {
    const filetypes = /pdf|doc|docx/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(
      path.extname(file.originalname).toLowerCase()
    );
    if (mimetype && extname) {
      return cb(null, true);
    }
    cb("Error: Apenas arquivos PDF ou DOC são permitidos!");
  },
});

// Rota para formulário de orçamento
app.post("/orcamento", (req, res) => {
  const { name, email, service, phone, cep, description } = req.body;

  // Configurar transporte de e-mail
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "eletrolink220@gmail.com", // Seu e-mail
      pass: "w b e m g a e f x n q k c c j​", // Substitua pela senha de aplicativo gerada
    },
  });

  // Configurar opções de e-mail
  const mailOptions = {
    from: "eletrolink220@gmail.com",
    to: "eletrolink220@gmail.com", // E-mail que receberá a notificação
    subject: "Novo pedido de orçamento recebido",
    text: `
      Nome: ${name}
      E-mail: ${email}
      Serviço: ${service}
      Telefone: ${phone}
      CEP: ${cep}
      Descrição: ${description}
      `,
  };

  // Enviar e-mail
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
      res.status(500).send("Erro ao enviar o e-mail.");
    } else {
      console.log("E-mail enviado: " + info.response);
      res.send("Solicitação de orçamento recebida e e-mail enviado!");
    }
  });
});

// Rota para formulário de trabalhe conosco
app.post("/trabalhe-conosco", upload.single("resume"), (req, res) => {
  const { name, email, phone } = req.body;
  const resumeFile = req.file;

  // Configurar transporte de e-mail
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "eletrolink220@gmail.com", // Substitua pelo seu e-mail
      pass: "renan1519", // Substitua pela sua senha ou use um App Password
    },
  });

  // Configurar opções de e-mail com anexo
  const mailOptions = {
    from: "eletrolink220@gmail.com",
    to: "eletrolink220@gmail.com", // E-mail que receberá a notificação
    subject: "Nova candidatura recebida",
    text: `
      Nome: ${name}
      E-mail: ${email}
      Telefone: ${phone}
      `,
    attachments: [
      {
        filename: resumeFile.originalname,
        path: resumeFile.path,
      },
    ],
  };

  // Enviar e-mail
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
      res.status(500).send("Erro ao enviar o e-mail.");
    } else {
      console.log("E-mail enviado: " + info.response);
      res.send("Candidatura recebida e e-mail enviado com sucesso!");
    }
  });
});

// Inicia o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
