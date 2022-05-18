//import puppeteer from 'puppeteer';
import axios from 'axios';
import cheerio from 'cheerio';
import FundsExplorerScrapyService from './fundsExplorer/FundsExplorerService';
import Reit from '../../../models/Reit';


export class FundsExplorerScraper {
  /*
  async scrapePupeteer(url: string) {
    const browser = await puppeteer.launch({})
    const page = await browser.newPage()

    await page.goto(url)
    var element = await page.waitForSelector("#meanings > div.css-ixatld.e15rdun50 > ul > li:nth-child(1) > a")
    var text = await page.evaluate(element => element.textContent, element)
    console.log(text)
    browser.close()
  }*/

  async getListRealState() {
    const url = 'https://www.fundsexplorer.com.br/ranking';
    const response = await axios.get(url);
    console.log(response.status);
    const html = response.data;

    const $ = cheerio.load(html);

    //const cityName = $('#firstHeading').text().trim();
    const htmlTest = $('#table-ranking').html();
    //console.log(htmlTest);


    $('#table-ranking > tbody > tr > td').toArray().map(item => {
      console.log($(item).text());
    });
  }

}

async function main() {
  const scraper = new FundsExplorerScrapyService();
  //await scraper.scrapeCity("https://www.thesaurus.com/browse/smart");
  //const reitList: Reit[] = await scraper.getReits();
  //console.log('reitList', reitList[reitList.length-1]);
  await scraper.getTest('test');
}

main();