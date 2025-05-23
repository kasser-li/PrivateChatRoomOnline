import mongoose, {
    Schema,
    Document,
    Model,
    FilterQuery,
    QueryOptions,
  } from "mongoose";
  
//   基础模型类，用于定义基础字段和逻辑

  export interface IBaseDocument extends Document {
    // id: mongoose.Types.ObjectId;
    deletedAt?: Date;
    createdAt: Date;
    updatedAt: Date;
    createdBy?: mongoose.Types.ObjectId;
    updatedBy?: mongoose.Types.ObjectId;
    version: number;
  }
  
  type ExtendedFilterQuery<T> = FilterQuery<T> & {
    deletedAt?: { $exists: boolean };
  };
  
  function toObjectId(
    id: mongoose.Types.ObjectId | string
  ): mongoose.Types.ObjectId {
    return typeof id === "string" ? new mongoose.Types.ObjectId(id) : id;
  }
//   基础模型字段定义
  export const baseSchemaDict = {
    // id: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   auto: true,
    // },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
    deletedAt: {
      type: Date,
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    updatedBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    version: {
      type: Number,
      default: 0,
    },
  };
  
  const baseSchema = new Schema<IBaseDocument>(baseSchemaDict);

  baseSchema.pre<IBaseDocument>("save", function (next) {
    this.updatedAt = new Date();
    this.version += 1;
    next();
  });
  
  class BaseModel<T extends Document> {
    private model: Model<T>;
  
    constructor(
      modelName: string,
      schemaDef: mongoose.SchemaDefinition,
      options: mongoose.SchemaOptions = {}
    ) {
      const schema = new Schema(
        {
          ...schemaDef,
          ...baseSchema.obj,
        },
        options
      );
      schema.set('toJSON',{
        transform: function (doc, ret) {
          ret.id = ret._id;
          delete ret.__v;
          delete ret.status;
          delete ret.isDeleted;
          delete ret.updateTime;
          delete ret._id;
          delete ret.createdAt;
          delete ret.updatedAt;
          delete ret.deletedAt;
          delete ret.version;
          return ret;
        },
      })
      this.model = mongoose.model<T>(modelName, schema);
    }
  
    protected getModel(): Model<T> {
      return this.model;
    }
  
    async create(
      doc: Partial<T>,
      userId?: mongoose.Types.ObjectId | null
    ): Promise<T> {
      if (userId) {
        (doc as any).createdBy = userId;
        (doc as any).updatedBy = userId;
      }
      return await this.model.create(doc);
    }
  
    async update(
      id: mongoose.Types.ObjectId | string,
      update: Partial<T>,
      userId: mongoose.Types.ObjectId
    ): Promise<T | null> {
      (update as any).updatedBy = userId;
      return await this.model.findByIdAndUpdate(toObjectId(id), update, { new: true }).exec();
    }
  
    async delete(
      id: mongoose.Types.ObjectId | string,
      userId?: mongoose.Types.ObjectId
    ): Promise<T | null> {
      return await this.model
        .findByIdAndUpdate(
          toObjectId(id),
          {
            deletedAt: new Date(),
            updatedBy: userId,
          },
          { new: true }
        )
        .exec();
    }
  
    async find(query: ExtendedFilterQuery<T>, options: QueryOptions = {}) {
      
      query.deletedAt = { $exists: false };
      return await this.model.find(query, options).exec();
    }
  
    async findById(
      id: mongoose.Types.ObjectId | string,
      options: QueryOptions = {}
    ): Promise<T | null> {
      const query: ExtendedFilterQuery<T> = {
        _id: toObjectId(id),
        deletedAt: { $exists: false },
      };
      return await this.model.findOne(query, options).exec();
    }
  
    async findOne(
      query: ExtendedFilterQuery<T>,
      options: QueryOptions = {}
    ): Promise<T | null> {
      query.deletedAt = { $exists: false };
      return await this.model.findOne(query, options).exec();
    }
  
    async findAllIncludingDeleted(
      query: FilterQuery<T>,
      options: QueryOptions = {}
    ) {
      return await this.model.find(query, options).exec();
    }
  }
  
  export default BaseModel;
