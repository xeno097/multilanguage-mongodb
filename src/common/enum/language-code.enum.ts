import { registerEnumType } from '@nestjs/graphql';

export enum LanguageCode {
  EN = 'en',
  ES = 'es',
}

registerEnumType(LanguageCode, {
  name: 'LanguageCode',
});
