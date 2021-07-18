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
  // @ManyToOne(() => Cards_category, (category) => category.cd_id) //liaison avec la table category
  // @JoinColumn({name: "cf_category"})
  // categoryId: Cards_category;

  @Field()
  @Column() 
  cf_name!: string;

  @Field()
  @Column()
  cf_color!: string;

}