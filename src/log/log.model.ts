import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Log } from './schemas/log.schema';

@Injectable()
export class LogModel {
    
    constructor(@InjectModel(Log.name) private readonly logModel: Model<Log>) { }

    async createLog(logData: Partial<Log>): Promise<Log> {
        const createdLog = new this.logModel(logData);
        return createdLog.save();
    }
}