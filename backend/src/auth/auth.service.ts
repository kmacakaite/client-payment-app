// https://docs.nestjs.com/recipes/passport
import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  private readonly validToken = 'your-secret-token'; // better to keep in the .env but for simplicity hardcoded here

  validateToken(token: string): boolean {
    return token === this.validToken;
  }
}
