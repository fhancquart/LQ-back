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

export class Cards_category extends BaseEntity{
  @Field() 
  @PrimaryGeneratedColumn()
  cd_id!: number;  

  @Field()
  @Column()
  cd_userid!: number;

  @Field()
  @Column()  
  cd_name!: string;
 
  @Field()
  @Column()
  cd_link!: string;

  @Field()
  @Column() 
  cd_resume!: string;  

  // @Field(() => Cards_family) 
  // @ManyToOne(() => Cards_family, family => family.category)
  // family!: Cards_family

} 

@ObjectType()
export class Cards_categoryResponse{
    @Field(() => [CardsError], {nullable: true}) //erreur ou null
    errors?: CardsError[];
    @Field(() => Cards_category, {nullable: true})
    cards?: Cards_category;
}