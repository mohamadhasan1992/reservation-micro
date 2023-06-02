import { AbstractDocument } from "@app/common";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";


@Schema({versionKey: false, timestamps: true})
export class UsersDocument extends AbstractDocument {
    
    @Prop()
    email: String;
    
    @Prop()
    password: String;
    
    
}   



export const UsersSchema = SchemaFactory.createForClass(UsersDocument)