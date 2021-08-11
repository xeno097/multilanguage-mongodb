import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { IGraphqlCustomContext } from '../interfaces/graphql-custom-context.interface';

export const GetRequestLanguage = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): string => {
    const gqlCustomContext: IGraphqlCustomContext =
      GqlExecutionContext.create(ctx).getContext();

    const { language } = gqlCustomContext.headers;

    return language as string;
  },
);
