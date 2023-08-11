import { ApiProperty } from '@nestjs/swagger';

export class LoginResponse {
  @ApiProperty({
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjo2LCJlbWFpbCI6ImFsaXhhbmRyZUBlbWFpbC5jb20iLCJyb2xlIjoiY29tcGFueSIsImlhdCI6MTY5MTcwNTA0OCwiZXhwIjoxNjkxNzA4NjQ4fQ.lHSKoEM_CdYf92f25Onx4jV-1gmBJK-4_G6K5lNzidY',
    description: 'Token JWT',
  })
  acess_token: string;
}
