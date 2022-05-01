import Reit from '../../../models/Reit';
export default interface IReitScrapyService {
    getReits(): Promise<Reit[]>;
    getReit(symbol: string): Promise<Reit>;
}