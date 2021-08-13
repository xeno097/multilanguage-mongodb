import { registerEnumType } from '@nestjs/graphql';

export enum LanguageCode {
  EN = 'en',
  ES = 'es',
  IT = 'it',
}

registerEnumType(LanguageCode, {
  name: 'LanguageCode',
});
