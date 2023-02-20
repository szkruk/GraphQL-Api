import {
  Args,
  Mutation,
  Parent,
  Query,
  Int,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { TickerModel } from 'src/tickers/model/ticker.model';
import { CreateQuoteInput } from './dto/create-quote.input';

import { QuoteModel } from './model/quote.model';
import { QuotesService } from './quotes.service';

@Resolver((of) => QuoteModel)
export class QuotesResolver {
  constructor(private quotesService: QuotesService) {}

  @Query((returns) => [QuoteModel], { name: 'quotes' })
  async findAllQuotes(): Promise<QuoteModel[]> {
    return this.quotesService.findAll();
  }

  @Query((returns) => QuoteModel, { name: 'quote' })
  async findOneQuote(
    @Args('name', { type: () => String }) name: string,
    @Args('timestamp', { type: () => Int }) timestamp: number,
  ): Promise<QuoteModel> {
    return this.quotesService.findOne(name, timestamp);
  }

  @Query((returns) => [QuoteModel], { name: 'quoteByName' })
  async findAllQuotesByName(
    @Args('name', { type: () => String }) name: string,
  ): Promise<QuoteModel[]> {
    return this.quotesService.findAllByName(name);
  }

  @ResolveField((returns) => TickerModel, { name: 'ticker' })
  ticker(@Parent() quote: QuoteModel): Promise<TickerModel> {
    return this.quotesService.findTicker(quote.name);
  }

  @Mutation((returns) => QuoteModel)
  async createQuote(
    @Args('createQuoteInput') createQuoteInput: CreateQuoteInput,
  ): Promise<QuoteModel> {
    return this.quotesService.createQuote(createQuoteInput);
  }

  @Mutation((returns) => QuoteModel)
  async deleteQuote(
    @Args('name', { type: () => String }) name: string,
    @Args('timestamp', { type: () => Int }) timestamp: number,
  ): Promise<QuoteModel> {
    return this.quotesService.deleteQuote(name, timestamp);
  }

  @Mutation((returns) => QuoteModel)
  async editQuote(
    @Args('createQuoteInput') createQuoteInput: CreateQuoteInput,
  ): Promise<QuoteModel> {
    return this.quotesService.editQuote(createQuoteInput);
  }
}