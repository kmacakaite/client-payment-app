// https://docs.nestjs.com/recipes/passport
import { Injectable } from '@nestjs/common';
import { AUTH_TOKEN } from 'src/config';

@Injectable()
export class AuthService {
  private readonly validToken = AUTH_TOKEN;

  validateToken(token: string): boolean {
    return token === this.validToken;
  }
}
