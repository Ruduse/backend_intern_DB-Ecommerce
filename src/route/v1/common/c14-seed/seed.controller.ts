import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { SeedService } from './seed.service';

@ApiTags('seeder')
@Controller()
export class SeedController {
  constructor(private seedService: SeedService) {}

  // @Post('provinces_districts_wards')
  // @HttpCode(200)
  // async seedProvincesDistrictsWards() {
  //   return this.seedService.seedProvincesDistrictsWards();
  // }
}
