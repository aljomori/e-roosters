import { Server } from "bun";
import { ResponseOptions } from "./responseJSON";

export type HandlerResponseFunction = (
  req: Request,
  server: Server,
) => Response | undefined;

export type Endpoints = Record<string, HandlerResponseFunction>;

class API {
  public endpoints: Endpoints = {};

  public handleOptions = (url: string) => {
    this.endpoints[`$OPTIONS_${url}`] = ResponseOptions;
  };
  public setEndpoints = (endpoints: Endpoints) => {
    this.endpoints = endpoints;
  };
  public get = (url: string, handler: HandlerResponseFunction) => {
    this.handleOptions(url);
    this.endpoints[`$GET_${url}`] = handler;
  };
  public post = (url: string, handler: HandlerResponseFunction) => {
    this.handleOptions(url);
    this.endpoints[`$POST_${url}`] = handler;
  };
  public put = (url: string, handler: HandlerResponseFunction) => {
    this.handleOptions(url);
    this.endpoints[`$PUT_${url}`] = handler;
  };
  public listen(req: Request, server: Server) {
    const url = new URL(req.url);
    const path = url.pathname;
    const method = req.method;

    const handler = this.endpoints[`$${method.toUpperCase()}_${path}`] || null;
    const handleResponse = () => {
      if (handler) {
        return handler(req, server);
      }

      return new Response("Endpoint not found", { status: 404 });
    };

    const response = handleResponse();
    console.log("Request:", `[${method.toUpperCase()}] ${path}`);
    console.log("Response:", response);

    return response;
  }
}
export default API;
