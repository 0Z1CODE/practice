import { Module } from "@nestjs/common";
import { TrackController } from './track.controller';
import { TrackService } from './track.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Track, TrackSchema } from "./schemes/track.schema";
import { Comment, CommentsSchema } from "./schemes/comments.schema";
import { FileService } from "src/file/file.service";


@Module({
  imports: [
    MongooseModule.forFeature([{ name: Track.name, schema: TrackSchema }]),
    MongooseModule.forFeature([{ name: Comment.name , schema: CommentsSchema }]),

  ],
  controllers: [TrackController],
  providers: [TrackService, FileService]
})

export class TrackModule {

}