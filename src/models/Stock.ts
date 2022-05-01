export default class Stock  {
  sector: string;
  name: string;
  symbol: string;
  price: number;
  ISIN: string;
  market: string;
  currency: string;
  description: string;
  dividend:number;  
  dividendYield: number;
  source: string;
  netWorth: number;

  constructor() {
    this.name = '';
    this.price = 0;
    this.symbol = '';
    this.market = '';
    this.currency = '';
    this.description = '';
    this.ISIN = '';
    this.sector = '';
    this.dividend = 0;
    this.dividendYield = 0;
    this.source = '';
    this.netWorth = 0;
}
}






















