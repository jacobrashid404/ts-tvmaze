import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";

/** Mock request */
function mock(method: tHttpMethods,
              path: string,
              data: Record<string, any>,
              status = 200) {

  mockServer.use(
    http[method](path, () =>
      HttpResponse.json(data, { status: status }),
    ));
}

const mockServer = setupServer();

export { mock, mockServer };
