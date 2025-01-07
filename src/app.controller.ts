import { Controller, Delete, Get, Patch, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('movie') // 모든 메서드에 동일한 Path가 들어간다면 최상위에서 공통적으로 설정할 수 있다.
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getMovies(){
    return [
      {
        id: 1,
        name: '해리포터',
        character: ['해리포터', '엠마왓슨'],
      },
      {
        id: 2,
        name: '반지의 제왕',
        character: ['간달프'],
      }
    ];
  }

  @Get('/:id')
  getMovie(){
    return {
      id: 1,
      name: '해리포터',
      character: ['해리포터', '엠마왓슨'],
    }
  }

  @Post()
  postMovie(){
    return {
      id: 3,
      name: '어벤져스',
      character: ['아이언맨', '캡틴아메리카']
    }
  }

  @Patch('/:id')
  patchMovie(){
    return {
      id: 3,
      name: '어벤져스',
      character: ['아이언맨', '블랙위도우']
    }
  }

  @Delete('/:id')
  deleteMovie(){
    return 3;
  }
}
