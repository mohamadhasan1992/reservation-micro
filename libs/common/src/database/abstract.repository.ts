import { FilterQuery, Model, Types, UpdateQuery } from "mongoose";
import { AbstractDocument } from "./abstract.schema"
import { Logger, NotFoundException } from "@nestjs/common";

export abstract class AbstractRepository<TDocument extends AbstractDocument>{

    constructor(
        protected readonly model: Model<TDocument>,
        protected readonly logger: Logger,
        ){}

    async create(document: Omit<TDocument, '_id'>): Promise<TDocument>{
        const createdDocument = new this.model({...document, _id: new Types.ObjectId()})
        return (await createdDocument.save()).toJSON() as unknown as TDocument;
    }
    async findOne(filterQuery: FilterQuery<TDocument>): Promise<TDocument>{
        const document =  await this.model.findOne(filterQuery, {}, {lean: true});
        if(!document){
            this.logger.warn('no document found for query:' ,filterQuery);
            throw new NotFoundException('Document Not Found!')
        }
        return document;
    }

    async findOneAndUpdate(
        filterQuery: FilterQuery<TDocument>, 
        update: UpdateQuery<TDocument>
        ): Promise<TDocument>{
            const document = await this.model.findOneAndUpdate(filterQuery, update, {
                lean: true,
                new: true
            });
            if(!document){
                this.logger.warn('no document found for query:' ,filterQuery);
                throw new NotFoundException('Document Not Found!')
            }
        return document
    }

    async find(filterQuery: FilterQuery<TDocument>): Promise<TDocument[]>{
        return await this.model.find(filterQuery, {}, {lean: true})
    }

    async findOneAndDelete(
        filterQuery: FilterQuery<TDocument>
    ){
        return this.model.findOneAndDelete(filterQuery, {lean: true})
    }
}