import axios from "axios";
import ExchangeRates from "../entities/ExchangeRates";
import { dailyValCursType } from "./type";

var iconv = require('iconv-lite');
var parser = require('xml2json');

var options = {
  object: true,
  reversible: false,
  coerce: false,
  sanitize: true,
  trim: true,
  arrayNotation: false,
  alternateTextNode: false
};

const getExchangeRates = async () => {
  const dataXML = await axios.get(
    'http://www.cbr.ru/scripts/XML_daily.asp',
    {
      responseType: 'arraybuffer',
      responseEncoding: 'binary'
    })
    .then(response => iconv.decode(Buffer.from(response.data), 'windows-1251'))

  let dataJSON = dataXML ? parser.toJson(dataXML, options) : { ValCurs: {} };

  return dataJSON as dailyValCursType;
}

export const updateExchangeRates = async () => {
  const data = await getExchangeRates() as dailyValCursType;
  const { Date, Valute } = data.ValCurs;

  if (Valute) {

    for (const v of Valute) {

      const { ID, NumCode, CharCode, Nominal, Name, Value } = v;

      const curs = ExchangeRates.create({ ID, Date, NumCode, CharCode, Nominal, Name, Value });
      await curs.save();
    }
  }

  return data;
}