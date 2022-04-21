
type ValuteType = {
  ID: string,
  NumCode: number,
  CharCode: string,
  Nominal: number,
  Name: string,
  Value: string
}

type ValCursType = {
  Date: string,
  name: string,
  Valute: Array<ValuteType>
}

export type dailyValCursType = {
  ValCurs: ValCursType
}