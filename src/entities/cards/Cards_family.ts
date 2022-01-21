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

export class Cards_family extends BaseEntity{
  @Field() 
  @PrimaryGeneratedColumn() 
  cf_id!: number;  

  @Field()
  @Column()
  cf_category: number;

  // @OneToMany(() => Cards_category, category => category.family)
  // category: Cards_category[];

  @Field()
  @Column() 
  cf_number!: number;

  @Field()
  @Column() 
  cf_name!: string;

  @Field()
  @Column()
  cf_color!: string;

}