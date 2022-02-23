import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { Comment, CommentDocument } from './schemes/comments.schema';
import { Track, TrackDocument } from './schemes/track.schema';
import { CreateTreckDTO } from './dto/create-treck.dto';
import { CreateCommentDTO } from './dto/create-comment.dto';
import { FileService, FileType } from 'src/file/file.service';
import { resourceLimits } from 'worker_threads';

@Injectable()

export class TrackService {
  constructor(@InjectModel(Track.name) private trackModel: Model<TrackDocument>,
    @InjectModel(Comment.name) private commentskModel: Model<CommentDocument>,
    private fileService: FileService) { }

  async create(dto: CreateTreckDTO, picture, audio): Promise<Track> {
    const audioPath = this.fileService.createFile(FileType.AUDIO, audio)
    const picturePath = this.fileService.createFile(FileType.IMAGE, picture)
    const track = await this.trackModel.create({
      ...dto, listens: 0, audio: audioPath, picture: picturePath
    })
    return track
  }

  async getAll(count = 10, offset = 0): Promise<Track[]> {
    const tracks = await this.trackModel.find().skip(Number(offset)).limit(Number(count))
    return tracks
  }

  async getSingle(id: ObjectId): Promise<Track> {
    const track = await this.trackModel.findById(id).populate('comments');
    return track
  }

  async deleteTrack(id: ObjectId): Promise<ObjectId> {
    const track = await this.trackModel.findByIdAndDelete(id)
    return track._id
  }

  async addComment(dto: CreateCommentDTO): Promise<Comment> {
    const track = await this.trackModel.findById(dto.trackId)
    const comment = await this.commentskModel.create({ ...dto })
    track.comments.push(comment._id)
    await track.save()
    return comment
  }

  async search(query: string): Promise<Track[]> {
    const tracks = await this.trackModel.find({
      name: { $regex: new RegExp(query) }
    })
    return tracks;
  }
}
