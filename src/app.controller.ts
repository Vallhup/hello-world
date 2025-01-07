import { Body, Controller, Delete, Get, NotFoundException, Param, Patch, Post, Query } from '@nestjs/common';
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
  getMovies(
    @Query('title') title?: string, // Query Parameter
  ){
    if(!title){
      return this.movies;
    }
    
    return this.movies.filter(m => m.title.startsWith(title));
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
  patchMovie(
    @Param('id') id: string,
    @Body('title') title:string,
  ){
    const movie = this.movies.find(m => m.id === +id);

    if(!movie){
      throw new NotFoundException('존재하지 않는 ID의 영화입니다!');
    }

    Object.assign(movie, {title});

    return movie;
  }

  @Delete(':id')
  deleteMovie(
    @Param('id') id: string,
  ){
    const movieIndex = this.movies.findIndex(m => m.id === +id);

    if(movieIndex === -1){
      throw new NotFoundException('존재하지 않는 ID의 영화입니다!');
    }

   this.movies.splice(movieIndex, 1)

   return id;
  }
}
