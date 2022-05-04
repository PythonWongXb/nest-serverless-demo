/*
 * @Author: your name
 * @Date: 2022-04-26 18:06:25
 * @LastEditTime: 2022-05-04 09:37:45
 * @LastEditors: Evan Zuo v_wangxiangbo01@baidu.com
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /ms-math/src/app.controller.ts
 */
import { Controller, Get, Inject } from '@nestjs/common';
import { AppService } from './app.service';
import {
  MessagePattern,
  EventPattern,
  ClientProxy,
} from '@nestjs/microservices';
import { Observable } from 'rxjs';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    @Inject('MATH_SERVICE') private client: ClientProxy,
  ) {}

  @MessagePattern('math:wordcount-old')
  wordCount(text: string): Promise<{ [key: string]: number }> {
    return this.appService.calculateWordCount(text);
  }

  @Get()
  helloWorld() {
    return 'hellow';
  }

  @EventPattern('math:wordcount_log')
  wordCountLog(text: string): void {
    console.log(text);
  }

  @EventPattern('demo')
  demo(text: string): void {
    console.log(text);
  }

  // micro

  @MessagePattern('math:wordcount')
  microWordCount(text: string): Observable<{ [key: string]: number }> {
    return this.client.send('math:mirco-wordcount', text);
  }

  @EventPattern('math:wordcount_log')
  microWordCountLog(text: string): void {
    this.client.emit('math:mirco-wordcount_log', text);
  }

  @Get('/demo')
  execute(): Observable<number> {
    const pattern = { cmd: 'sum' };
    const data = [1, 2, 3, 4, 5];
    return this.client.send<number>(pattern, data);
  }

  @MessagePattern({ cmd: 'sum' })
  sum(data: number[]): number {
    return (data || []).reduce((a, b) => a + b);
  }
}
