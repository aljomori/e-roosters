export interface APIResponse<P> {
  status: "success" | "error";
  data: P;
}

const acceptedOrigins = ["http://192.168.4.37:8080"];

export const ResponseJSON = <T>(
  data: T,
  status: number,
  headers = {} as Headers,
) => {
  return new Response(JSON.stringify(data), {
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": acceptedOrigins.join(","),
      ...headers,
    },
    status,
  });
};

export const ResponseOptions = () => {
  return new Response(null, {
    // Allow requests from any origin
    headers: {
      "Access-Control-Allow-Origin": acceptedOrigins.join(","),
      // Specify allowed HTTP methods
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
      // Specify allowed headers (e.g., Content-Type, Authorization, etc.)
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
      // Optional: Indicate whether the response to the request can be exposed when credentials are present
      "Access-Control-Allow-Credentials": "true",
    },
  });
};
