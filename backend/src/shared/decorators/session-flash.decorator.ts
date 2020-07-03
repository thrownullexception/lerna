import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export interface IFlashPayload {
  info?: string;
  error?: string;
  success?: string;
}

export interface ISessionFlash {
  success: (message: string) => void;
}

export interface ISessionPayload {
  flash: IFlashPayload;
}

const set = (session: ISessionPayload, path: keyof IFlashPayload, message: string): void => {
  session.flash = {};
  session.flash[path] = message;
};

export const SessionFlash = createParamDecorator(
  (_: string, ctx: ExecutionContext): ISessionFlash => {
    const { session } = ctx.switchToHttp().getRequest();
    // Possible Closure Memory Issues
    return {
      success: (message: string): void => {
        set(session, 'success', message);
      },
    };
  },
);
