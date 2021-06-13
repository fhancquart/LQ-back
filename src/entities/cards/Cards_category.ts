import {ObjectType, Field} from 'type-graphql';
import {BaseEntity, Column, Entity, PrimaryGeneratedColumn} from "typeorm"


@ObjectType()
@Entity() 

export class Cards_category extends BaseEntity{
  @Field() 
  @PrimaryGeneratedColumn() 
  cd_id!: number;  

  @Field()
  @Column()
  cd_userid: number;

  @Field()
  @Column({unique: true}) 
  cd_name!: string;

  @Field()
  @Column({unique: true})
  cd_link!: string;

}