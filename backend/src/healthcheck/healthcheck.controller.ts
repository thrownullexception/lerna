import { Get, Controller } from '@nestjs/common';

@Controller('health')
export class HealthCheckController {
  @Get()
  check(): { status: string } {
    return { status: 'ok' };
  }
}
