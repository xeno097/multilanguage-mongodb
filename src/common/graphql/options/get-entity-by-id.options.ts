import { ArgsOptions, ID } from '@nestjs/graphql';

export const getEntityByIdArgOptions: ArgsOptions = { type: () => ID };
