/*
 * @Author: your name
 * @Date: 2022-04-26 18:06:25
 * @LastEditTime: 2022-05-05 21:33:21
 * @LastEditors: Evan Zuo v_wangxiangbo01@baidu.com
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /ms-math/src/app.service.ts
 */
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  async calculateWordCount(str: string): Promise<{ [key: string]: number }> {
    await new Promise((resolve) => {
      setTimeout(() => {
        resolve(1);
      }, 2000);
    });
    const words = str.trim().split(/\s+/);
    return words.reduce((a, c) => ((a[c] = (a[c] || 0) + 1), a), {});
  }
}
