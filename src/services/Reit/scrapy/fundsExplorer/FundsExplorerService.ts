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


    
    async getTest(symbol: string): Promise<Reit[]> {
      const url = "https://www.idealista.pt/comprar-casas/matosinhos-e-leca-da-palmeira/matosinhos-sul-marginal/";
      try {
        const headers =  {
          "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
          "accept-language": "en-US,en;q=0.9,pt-BR;q=0.8,pt;q=0.7,es;q=0.6",
          "cache-control": "max-age=0",
          "sec-ch-device-memory": "8",
          "sec-ch-ua": "\" Not A;Brand\";v=\"99\", \"Chromium\";v=\"101\", \"Google Chrome\";v=\"101\"",
          "sec-ch-ua-arch": "\"x86\"",
          "sec-ch-ua-full-version-list": "\" Not A;Brand\";v=\"99.0.0.0\", \"Chromium\";v=\"101.0.4951.67\", \"Google Chrome\";v=\"101.0.4951.67\"",
          "sec-ch-ua-mobile": "?0",
          "sec-ch-ua-model": "\"\"",
          "sec-ch-ua-platform": "\"Windows\"",
          "sec-fetch-dest": "document",
          "sec-fetch-mode": "navigate",
          "sec-fetch-site": "none",
          "sec-fetch-user": "?1",
          "upgrade-insecure-requests": "1",
          "cookie": "euconsent-v2=CPLGwcAPLGwcAAHABBENCMCoAP_AAAAAAB6YF5wBAAIAAtAC2AvMAAABAaADAAEEWCUAGAAIIsFIAMAAQRYIQAYAAgiwOgAwABBFgJABgACCLAyADAAEEWBUAGAAIIsA.f_gAAAAAAAAA; _gcl_au=1.1.775597818.1651357486; _cb=XhCO2gDVWeUpDAu; _chartbeat2=.1651357485842.1651357485842.1.BIIurrDLbqcbCDRce7CTZb_6CtGq7V.1; atuserid=%7B%22name%22%3A%22atuserid%22%2C%22val%22%3A%228d25687b-6225-426d-b814-e876a683a78b%22%2C%22options%22%3A%7B%22end%22%3A%222023-06-01T22%3A24%3A45.869Z%22%2C%22path%22%3A%22%2F%22%7D%7D; atidvisitor=%7B%22name%22%3A%22atidvisitor%22%2C%22val%22%3A%7B%22vrn%22%3A%22-582068-%22%7D%2C%22options%22%3A%7B%22path%22%3A%22%2F%22%2C%22session%22%3A15724800%2C%22end%22%3A15724800%7D%7D; _fbp=fb.1.1651357485900.146479688; TestIfCookie=ok; TestIfCookieP=ok; pbw=%24b%3d16100%3b%24o%3d11100%3b%24sw%3d1920%3b%24sh%3d1080; pid=1472689873171415068; userUUID=0aed8e8e-7c6c-4e08-aacc-19985ef78469; _hjid=85a81caa-4123-4946-bc2c-a278d2f8563a; _hjSessionUser_1676782=eyJpZCI6IjU1NzVhYTUwLTQ2N2YtNWQwZC04NDFkLWYyZjU0ZTFmYmM4YiIsImNyZWF0ZWQiOjE2NTI3MTE1MTQ4NDEsImV4aXN0aW5nIjp0cnVlfQ==; _hjCachedUserAttributes=eyJhdHRyaWJ1dGVzIjp7ImlkX3BhZ2VMYW5ndWFnZSI6InB0IiwiaWRfdXNlclJvbGUiOiIifSwidXNlcklkIjpudWxsfQ==; lcsrd=2022-05-16T14:32:21.3653525Z; Trk0=Value=376599&Creation=16%2f05%2f2022+16%3a34%3a06; send8716e946-69e4-4bfc-90cc-05c8117c4d2e=\"{'friendsEmail':null,'email':null,'message':null}\"; SESSION=38fd805ad794c322~1deb8309-0f4c-496e-bfb7-aed73fadc21f; sasd=%24qc%3D1314596398%3B%24ql%3DLow%3B%24qpc%3D1900-798%3B%24qt%3D58_1442_10621t%3B%24dma%3D0; ABTasty=uid=a08dj4c6785nqhzk&fst=1652711527804&pst=1652711527804&cst=1652865214970&ns=2&pvt=4&pvis=2&th=; cookieSearch-1=\"/comprar-casas/matosinhos-e-leca-da-palmeira/matosinhos-sul-marginal/:1652865393566\"; contact1deb8309-0f4c-496e-bfb7-aed73fadc21f=\"{'email':null,'phone':null,'phonePrefix':null,'friendEmails':null,'name':null,'message':null,'message2Friends':null,'maxNumberContactsAllow':10,'defaultMessage':true}\"; vs=37942=4905984&33116=4931116; sasd2=q=%24qc%3D1314596398%3B%24ql%3DUnknown%3B%24qpc%3D1900-798%3B%24qt%3D58_1442_10621t%3B%24dma%3D0&c=1&l&lo&lt=637884693984464190&o=1; dyncdn=2; utag_main=v_id:01807c938753000a9a5959c11b7005074007706c00bd0$_sn:3$_se:3$_ss:0$_st:1652867194983$dc_visit:2$ses_id:1652865213807%3Bexp-session$_pn:3%3Bexp-session$_prevVtSource:directTraffic%3Bexp-1652868814815$_prevVtCampaignCode:%3Bexp-1652868814815$_prevVtDomainReferrer:%3Bexp-1652868814815$_prevVtSubdomaninReferrer:%3Bexp-1652868814815$_prevVtUrlReferrer:%3Bexp-1652868814815$_prevVtCampaignLinkName:%3Bexp-1652868814815$_prevVtCampaignName:%3Bexp-1652868814815$_prevVtRecommendationId:%3Bexp-1652868814815$_prevCompletePageName:11%3A%3Alisting%3A%3AresultList%3A%3Aothers%3Bexp-1652868995880$_prevLevel2:11%3Bexp-1652868995880$dc_event:1%3Bexp-session$dc_region:eu-west-1%3Bexp-session; cto_bundle=mcRW_183MnZRbUViYXlnb0Fxclg1WlpXWVFJRlJ5OVMlMkZVNEVSREE5T3lNamRYbzY1SmJDZ1k5bmI1Qkw3RXZDZ1k5SWE3YWxyZjczeW5YeSUyRkc0SWJVb0lTa05LaHhqaWVsJTJGbFNJZnpKUmFld3ZTSHAlMkZrY21ZVkMyV25NcGlCUFdpYU1JY2VUMU4yeldhWFNXeUZ1TWdmZiUyRnFRJTNEJTNE; datadome=cHEDqFZFgvfc7KMjxwP5M2NjQJo4QcpVSKXhHEo8NFc~xiZxMINpo8R8JV1xqfs7A0DlzggtMCZG-sVk5NyD070wwSOn0SM8D2z2ENBKI1DefW.EXw0-sEMwBWj0n5f"
        };
      const response = await axios.get(url, {headers:headers});
      const html = response.data;
      console.log('status', response.status);
  
      const $ = cheerio.load(html);
      
      const articleArray = $('#main-content > section.items-container').find('article').toArray();

      articleArray.map((item, index) => {
        const articleContainer = $(item).find('.item-info-container');
        const description = $(item).find('.item-link').text();
        console.log(description)
        
      })
      console.log(articleArray.length);

        
    } catch (error) {
      console.log(error);
      throw new Error('error '+error);
      
      }
      return []

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