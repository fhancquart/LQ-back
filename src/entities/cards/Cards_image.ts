
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

export class Cards_image extends BaseEntity{

    @Field() 
    @PrimaryGeneratedColumn() 
    img_id!: number; 

    @Field()
    @Column() 
    img_name!: string;

    @Field()
    @Column() 
    img_type!: number;

    @Field()
    @Column() 
    img_tag1!: number;

    @Field()
    @Column() 
    img_tag2!: number;

    @Field()
    @Column() 
    img_tag3!: number;

}