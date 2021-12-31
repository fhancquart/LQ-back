
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

export class Cards_tags extends BaseEntity{

    @Field() 
    @PrimaryGeneratedColumn() 
    tag_id!: number; 

    @Field()
    @Column() 
    tag_num!: number;

    @Field()
    @Column() 
    tag_name!: string;

}