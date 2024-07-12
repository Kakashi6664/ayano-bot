import fetch from 'node-fetch';
import fs from 'fs';
import CryptoJS from 'crypto-js';

let handler = async function (m, { text }) {
  const datas = global;
  const idioma = datas.db.data.users[m.sender].language; // الحصول على لغة المستخدم من قاعدة البيانات
  const _translate = JSON.parse(fs.readFileSync(`./language/${idioma}.json`)); // قراءة ملف الترجمة الخاص بلغة المستخدم
  const tradutor = _translate.BK9.BK9;
  var cryptolang = "oa9";
  const url1 = "U2FsdGVkX19/cE5/FS7S1WidUoAz6aITEjYU0xTUEZ8k4pBEsvgWPmEkjvdgPb1KKEfrWq+68oau3d0DTpmLvg=="
  const mytext1 = "U2FsdGVkX1+zy6SkhEA9omedCCmp9dgOaLP3kAS+hc9V7a1NVUOiq+6SOcT+ExOpgp0zW9O48XWx+rStvfbuwsyN8p0RQTfmRKUcbRfZa3UaOY5l2rJW6ghlBcv1rtDdTOIVmnQB5IxwS26OdFraRhmwtBJ8c7TAaIi7pjX1HdM1OQ+UGSsUfJIl+Z/Y7uiw1tItcDiAT8e2iXl/BUebkANvwv6JbHY30cZcsCs3sPqgJpNcvFfZhdSCZaOW/2NG1yGwLPdTR/FzBy5K34l1jyluPKf6PPK2DqEMXBiZTeY5caRurJGR+DgSiGT3MDLhiONIS2eVEQSTkqIdifR3O4tlkZNv1bYAGmZtOqGPlYk8Dx5sRx+yzSIwpJkxu4fPwt5gqPSZEUaBA3yHqqjET1P2U/yz2KdgXOksHg/2WhiLa6Nsaab5JDqMxtEl810YUWOHEZegQFvqhvgEhpNwKPIPaLWPtgBQaSpOAhbP/uW21ZKqRYXw8NhQqYeAkV8i"
  const mytext2 = "U2FsdGVkX1/vetM2PWRerixUHmCHJLTjaPu0bxJ5yeiFF4vkiDwxo9gwUeMJqZBGXmOD9NK59T8tJaUGKeMjhOvszxFsXlFrxrZKFYFSwTGa/IJ1vVJu/KaugljDiD6omi9EtHesTyHSXor3itI76qxLZCOBKwoDSvzhdBCVcuI="
  const mytext3 = "U2FsdGVkX1+wUC0d5Qp/pZBgAIsouxkk2ptzGqZ7SAi124bjfSZ82hs024d1a6Q3O1ZUCYZidnUfchNaO4p5lAyEH4N8L49g3nRY1yaJ/xMvje2fucBN4ECHRNxbbTvca4WVDzz8etZ81Kc2abs9WLiA758EuyTZUWPowt7IZCAM6682djw7SWLe6j6ifKNqEa3XsIRXmh82pb2DcVjPIg=="

// Decrypt the base URL
const bytesApiUrlBase = CryptoJS.AES.decrypt(url1, cryptolang);
const decryptedApiUrlBase = bytesApiUrlBase.toString(CryptoJS.enc.Utf8);

const bytesmytext1 = CryptoJS.AES.decrypt(mytext1, cryptolang);
const decryptedmytext1 = bytesApiUrlBase.toString(CryptoJS.enc.Utf8);

const bytesmytext2 = CryptoJS.AES.decrypt(mytext2, cryptolang);
const decryptedmytext2 = bytesApiUrlBase.toString(CryptoJS.enc.Utf8);

const bytesmytext3 = CryptoJS.AES.decrypt(mytext3, cryptolang);
const decryptedmytext3 = bytesApiUrlBase.toString(CryptoJS.enc.Utf8);

  try {
    if (!text) {
      m.reply(`${decryptedmytext1}`);
      return;
    }
    const [link, alias] = text.split("+").map(part => part.trim());
    let apiUrl = `${decryptedApiUrlBase}${encodeURIComponent(link)}`; 
    if (alias) apiUrl += `&alias=${encodeURIComponent(alias)}`;
    const response = await fetch(apiUrl);
    const data = await response.json(); 

    if (data.BK99) {
      return m.reply(`${decryptedmytext2}`);
    }
    const shortURL = data.BK9;
    return m.reply(`${shortURL}`);
  } catch (error) {
    console.error(error);
    return m.reply(`${decryptedmytext3}`);
  }
};

handler.command = ['اختصار'];
handler.tags = ['tools'];
export default handler;
