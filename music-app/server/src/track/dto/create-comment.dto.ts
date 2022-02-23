import { ObjectId } from 'mongoose';

export class CreateCommentDTO {
  readonly username;
  readonly text;
  readonly trackId:ObjectId;
}