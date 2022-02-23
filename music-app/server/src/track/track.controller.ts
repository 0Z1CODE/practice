import { Body, Controller, Delete, Get, Param, Post,  Query,  UploadedFiles, UseInterceptors } from "@nestjs/common";
import { CreateTreckDTO } from "./dto/create-treck.dto";
import { TrackService } from "./track.service";
import { ObjectId } from 'mongoose';
import { CreateCommentDTO } from './dto/create-comment.dto';
import { FileFieldsInterceptor } from "@nestjs/platform-express";

@Controller("/tracks")


export class TrackController {
  constructor(private trackService: TrackService) { }

  @Post()
  @UseInterceptors(FileFieldsInterceptor([
      { name: 'picture', maxCount: 1 },
      { name: 'audio', maxCount: 1 },
  ]))

  ccreate(@UploadedFiles() files, @Body() dto: CreateTreckDTO) {
    console.log(files);
    const {picture, audio} = files
    return this.trackService.create(dto, picture[0], audio[0]);
  }
  /*  */
  @Get()
  getAll(@Query('count') count: number, @Query ('offset') offset: number) {
    return this, this.trackService.getAll(count, offset)
  }

  @Get('/search')
  search(@Query('query') query: string) {
    return this, this.trackService.search(query)
  }


  @Get(':id')
  getSingle(@Param("id") id: ObjectId) {
    return this.trackService.getSingle(id)
  }

  @Delete(':id')
  deleteTrack(@Param('id') id: ObjectId) {
    return this.trackService.deleteTrack(id)
  }

  @Post('/comment')
  addComment(@Body() dto: CreateCommentDTO) {
    return this.trackService.addComment(dto)
  }
}

