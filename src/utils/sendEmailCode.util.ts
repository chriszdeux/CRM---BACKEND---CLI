import { NextFunction, Request, Response } from "express";
import { generateRandomCode } from "./generateRandomCode.utils";

const nodemailer = require('nodemailer');
require('dotenv').config();

const fs = require('fs');
const path = require('path');



export const sendCodeEmail = async (email: string, code: string) => {
  const emailAuth = process.env.CRYPTO_EMAIL
  const password = process.env.EMAIL_PASSWORD
  const config = {
    host: 'smtp.gmail.com',
    port: 587,
    secure:false,
    auth: {
      user: emailAuth,
      pass: password
    }
  }
  console.log(config)
  const templatePath = path.join(__dirname, '..', 'templates', 'CodeConfirm.template.html');
  const htmlView = await fs.promises.readFile(templatePath, 'utf-8');
  const addingCodeToHtml = htmlView.replace('email_code', code);
  
  const mailOptions = {
    from: process.env.CRYPTO_EMAIL,
    to: email,
    subject: 'Code confirm from CryptoLI',
    text: 'Contenido del correo en texto plano',
    html: addingCodeToHtml,
  };

  const transporter = await nodemailer.createTransport(config);
  const info = await transporter.sendMail(mailOptions);
  console.log(info)
};


