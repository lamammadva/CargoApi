import { Module } from '@nestjs/common';
import { PuppeteerService } from './service';

@Module({
  providers: [PuppeteerService],
  exports: [PuppeteerService],
})
export class PuppeteerModule {}
