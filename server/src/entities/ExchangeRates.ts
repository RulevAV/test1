import { BaseEntity, Column, Entity, PrimaryColumn } from "typeorm";

@Entity("exchange_rates")
export default class ExchangeRates extends BaseEntity {

  @PrimaryColumn()
  ID: string;

  @PrimaryColumn()
  Date: string;

  @Column()
  NumCode: number;

  @Column()
  CharCode: string;

  @Column()
  Nominal: number;

  @Column()
  Name: string;

  @Column()
  Value: string;
}


