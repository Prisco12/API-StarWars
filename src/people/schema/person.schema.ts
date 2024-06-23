import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type PeopleDocument = HydratedDocument<People>;

@Schema()
export class People {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  height: string;

  @Prop({ required: true })
  mass: string;

  @Prop({ required: true })
  hair_color: string;

  @Prop({ required: true })
  skin_color: string;

  @Prop({ required: true })
  eye_color: string;

  @Prop({ required: true })
  birth_year: string;

  @Prop({ required: true })
  gender: string;

  @Prop([String])
  films: string[];
}

export const PeopleSchema = SchemaFactory.createForClass(People);