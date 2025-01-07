import { Body, Controller, Delete, Get, NotFoundException, Param, Patch, Post } from '@nestjs/common';
import { AppService } from './app.service';

interface Movie {
  id: number;
  title: string;
}


@Controller('movie') // 모든 메서드에 동일한 Path가 들어간다면 최상위에서 공통적으로 설정할 수 있다.
export class AppController {
  private movies : Movie[] = [
    {
      id: 1,
      title: '해리포터',
    },
    {
      id: 2,
      title: '반지의 제왕',
    }
  ];
  private idCounter = 3;

  constructor(private readonly appService: AppService) {}

  @Get()
  getMovies(){
    return this.movies;
  }

  @Get(':id')
  getMovie(@Param('id') id: string){
    const movie = this.movies.find((m) => m.id === +id);

    if(!movie){
      throw new NotFoundException('존재하지 않는 ID의 영화입니다!');
    }

    return movie; 
  }

  @Post()
  postMovie(
    @Body('title') title: string,
  ){
    const movie: Movie = {
      id: this.idCounter++,
      title: title,
    };

    this.movies.push(
      movie,
    );

    return movie;
  }

  @Patch(':id')
  patchMovie(){
    return {
      id: 3,
      name: '어벤져스',
      character: ['아이언맨', '블랙위도우']
    }
  }

  @Delete(':id')
  deleteMovie(){
    return 3;
  }
}
