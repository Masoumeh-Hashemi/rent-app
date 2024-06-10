declare module "swagger-ui-express" {
  import { RequestHandler } from "express";

  interface SwaggerUiOptions {
    explorer?: boolean;
    swaggerOptions?: Record<string, unknown>;
    customCss?: string;
    customJs?: string;
    customfavIcon?: string;
    customSiteTitle?: string;
    customCssUrl?: string;
  }

  export function setup(
    swaggerDoc: object,
    options?: SwaggerUiOptions,
    swaggerOptions?: Record<string, unknown>,
    customCss?: string,
    customfavIcon?: string,
    customJs?: string
  ): RequestHandler;

  export function serveFiles(
    swaggerDoc: object,
    options?: SwaggerUiOptions
  ): RequestHandler[];

  export const serve: RequestHandler[];
}
