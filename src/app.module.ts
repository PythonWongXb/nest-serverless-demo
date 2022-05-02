import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ClientsModule.register([{ name: 'MATH_SERVICE', transport: Transport.TCP }]),
    ClientsModule.register([
      {
        name: 'MATH_SERVICE_INTERFLOW',
        transport: Transport.TCP,
        options: {
          host: 'localhost',
          port: 8029,
        },
      },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
