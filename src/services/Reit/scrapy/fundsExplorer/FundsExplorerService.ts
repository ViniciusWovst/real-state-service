import axios from 'axios';
import cheerio from 'cheerio';
import Reit from '../../../../models/Reit';
import IReitScrapyService from '../IReitScrapyService';

export default class FundsExplorerScrapyService implements IReitScrapyService {
    baseUrl: string = 'https://www.fundsexplorer.com.br';
    market: string = 'IBOV';
    currency: string = 'BRL';
    source: string = 'FundsExplorer';

    constructor() {
        
    }
    async getReit(symbol: string): Promise<Reit> {
      const url = `${this.baseUrl}/funds/${symbol}`;
  
        const response = await axios.get(url);
        const html = response.data;
    
        const $ = cheerio.load(html);  
        const reit = new Reit();

        //extracting description
        const descriptionArray = $('#description-content-description').find('p').toArray();
        const descriptionCount = descriptionArray.length
        let description = '';
        descriptionArray.map((item, index) => {
          if (index + 1 < descriptionCount - 4)
            return description += $(item).text();  
        })

        //extraction name
        const name  = $('#head > div > div > div > h3').text();
        reit.description = description;
        reit.name = name
        return reit;

    }

    async getReits () :  Promise<Reit[]>  {
      const url = `${this.baseUrl}/ranking`;
      const INDEX_COLUMN_SYMBOL = 0;
      const INDEX_COLUMN_SECTOR = 1;
      const INDEX_COLUMN_PRICE = 2;
      const INDEX_COLUMN_DIVIDEND = 4;
      const INDEX_COLUMN_QTY_ASSETS = 25;
      const INDEX_COLUMN_DIVIDEND_YIELD = 5;
      const INDEX_NET_WORTH = 16;
      try {
        const response = await axios.get(url);
        console.log(response.status);
        const html = response.data;
    
        const $ = cheerio.load(html);  
        console.log('Loading reits...');
        const reitList =  $('#table-ranking > tbody > tr').toArray().map(async (item) => {
          
          const symbol= $($(item).find('td')[INDEX_COLUMN_SYMBOL]).text();
          const price = $($(item).find('td')[INDEX_COLUMN_PRICE]).text();
          const sector = $($(item).find('td')[INDEX_COLUMN_SECTOR]).text();
          const dividend = $($(item).find('td')[INDEX_COLUMN_DIVIDEND]).text();
          const qtyAssets = $($(item).find('td')[INDEX_COLUMN_QTY_ASSETS]).text();
          const dividendYield = $($(item).find('td')[INDEX_COLUMN_DIVIDEND_YIELD]).text();
          const netWorth = $($(item).find('td')[INDEX_NET_WORTH]).text();

          const reit = await this.getReit(symbol);
          reit.symbol = symbol;
          reit.price = parseFloat(price.replace('R$ ', '').replace(',', '.'));
          reit.sector = sector;
          reit.currency = this.currency;
          reit.market = this.market;
          reit.source = this.source;
          reit.dividend = parseFloat(dividend.replace('R$ ', '').replace(',', '.'));
          reit.qtyAssets = parseFloat(qtyAssets);
          reit.dividendYield = parseFloat(dividendYield.replace('%', '').replace(',', '.'));
          reit.netWorth = parseFloat(netWorth.replace('R$ ', '').replace(/\./g,'').replace(',', '.'));          

          return reit;
        });

        return await Promise.all(reitList);
      } catch (error) {
        console.log(error);
        throw new Error('error');
        
        }
    }
}