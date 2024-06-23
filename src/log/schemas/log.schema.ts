import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type LogDocument = HydratedDocument<Log>;

@Schema({ timestamps: true })
export class Log {
    @Prop({ type: Object })
    request: any;

    @Prop({ type: Object })
    response: any;

    @Prop({ type: Object })
    error: any;

    @Prop()
    responseTime: number;
}

export const LogSchema = SchemaFactory.createForClass(Log);