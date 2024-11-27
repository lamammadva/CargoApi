import { DynamicModule, Module } from '@nestjs/common';
import { RedisService } from './redis.service';

@Module({
  providers: [RedisService],
  exports: [RedisService],
})
export class RedisModule {
  static register(config: { host: string; port: number }): DynamicModule {
    return {
      module: RedisModule,
      imports: [],
      global: true,
      providers: [
        {
          provide: 'REDIS_CONFIG',
          useValue: config,
        },
        RedisService,
      ],
      exports: [RedisService, 'REDIS_CONFIG'],
    };
  }
}
