import {ObjectType, Field} from 'type-graphql';
import {BaseEntity, Column, Entity, PrimaryGeneratedColumn} from "typeorm"

@ObjectType()
export class CardsError{
    @Field()
    field: string;
    @Field()
    message: string;
}


@ObjectType()
@Entity() 

export class Cards_game extends BaseEntity{
  @Field() 
  @PrimaryGeneratedColumn() 
  cg_id!: number;  

  @Field()
  @Column()
  cg_category!: number;

  @Field()
  @Column() 
  cg_family!: number;

  @Field()
  @Column()
  cg_number!: number;

  @Field()
  @Column() 
  cg_question!: string;

  @Field()
  @Column() 
  cg_reponse!: string;
}

@ObjectType()
export class Cards_categoryResponse{
    @Field(() => [CardsError], {nullable: true}) //erreur ou null
    errors?: CardsError[];
    @Field(() => Cards_game, {nullable: true})
    cards?: Cards_game;
}