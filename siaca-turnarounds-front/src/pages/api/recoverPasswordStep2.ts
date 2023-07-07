// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

/**
 * * * * * * * * * TYPES (these should be in a separate files for types declaration, and imported for usage) * * * * * * * *
 */

export type HttpsError = {
  error: {
    status: number;
    message: string;
    details?: unknown;
  };
};

// Body expected to be received on request to backend (and also on this endpoint)
export type BodyBackend = {
  [key: string]: any;
};

// The answer expected from actual backend API response
export type ResponseBackend = {
  // NTR: Could be anything
  idUser: string;
  [rest: string]: any;
};

export type Response = {
  [rest: string]: any;
};

/**
 * * * * * * * * * END OF TYPES * * * * * * * *
 */

/**
 * * * * * * * * * HELPERS AND CONFIG (these should also be in different files) * * * * * * * *
 */
const BACKEND_BASE_URL = process.env.BACKEND_BASE_URL; // from .env.local file

/**
 * Verify if a provided value is a valid JSON
 *
 * @param {string | Record<string, any>} json data to be verified
 *
 * @return {boolean} true if it's a valid JSON, otherwise false
 */
export function isValidJson(json: string | Record<string, any>): boolean {
  try {
    if (typeof json === "object") return true;
    // This will throw an error if not valid JSON
    JSON.parse(json);
    return true;
  } catch (error) {
    return false;
  }
}

/**
 * Get the expected HTTPS error response format
 *
 * @param {number} status HTTP status
 * @param {string } message
 * @param {unknown} details
 *
 * @return {HttpsError}
 */
export function httpsError(
  status: number,
  message: string,
  details?: unknown
): HttpsError {
  return {
    error: {
      status,
      message,
      details,
    },
  };
}

/**
 * * * * * * * * * END HELPERS AND CONFIG * * * * * * * *
 */

// NTR: This type does is OK to be declared in this file (for me, at least), because you can reuse it and change it easily
type Data =
  | Response // NoteToRomero: This is the type of the response THIS API endpoint will send when success
  | HttpsError; // This is the response that will be send when any error

// List of HTTP methods that DOES NOT allow to send a body in request (this could be in a different setup file)
// List of valid HTTP methods for THIS endpoint
const validHTTPMethods: string[] = ["GET", "POST", "PUT", "DELETE", "PATCH"];

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  let status = 500;
  let statusText = "INTERNAL";

  try {
    // Get request method (GET by default)
    const httpMethod: string = "PATCH";

    if (!validHTTPMethods.includes(httpMethod)) {
      status = 405;
      throw new Error("Invalid HTTP method");
    }

    // To be used as fetch options
    let fetchOptions: RequestInit = {
      method: httpMethod,
    };

    // Headers to be included in request regardless of the HTTP method
    const regularHeaders: Record<string, any> = {
      //...req.headers, // Include any received headers on the request
      // Add any other custom headers here...
    };

    // if provided HTTP method requires a body

    // Verify if provided body is JSON (only for valid methods)

    // Use the received body
    let body = JSON.parse(req.body);

    // Update options to the request with any additional related to body (for example, content-type)
    fetchOptions = {
      ...fetchOptions, // Stay with the previous options
      // Update the new ones
      headers: {
        ...regularHeaders, // Include the regular headers
        "Content-Type": "application/json", // Add body content-type
        // Any additional headers here only related to request body...
      },

      body: JSON.stringify({
        password: body?.["password"],
      }),
    };

    // Backend URL
    const url =
      `${BACKEND_BASE_URL}usuarios/password-reset` +
      "/" +
      body?.["emailValue"] +
      "/" +
      body?.["tokenValue"];

    // Make the actual request to backend
    const response = await fetch(url, fetchOptions);

    status = response.status;

    if (!response.ok) {
      // Log the response message in case of error (ON SERVER SIDE/TERMINAL)
      console.error("Server response message: ", await response.text());

      throw new Error(
        `Error from backend (${response.status}|${response.statusText})`
      );
    }

    const responseJson: ResponseBackend | undefined = await response.json();

    if (!responseJson) {
      throw new Error(
        `Failure in backend response. (${response.status}|${response.statusText})`
      );
    }

    // You can do some preprocessing to the backend response data
    const preprocessedData = responseJson;

    // The response of THIS endpoint
    const result: Response = {
      // You can add fields if required,
      // Or just Include the content of actual backend response
      ...preprocessedData,
      // Whatever. Do what you need
    };

    // Finally response with the same HTTP Status as the backend response and the result as JSON
    res.status(status).json(result);
  } catch (error) {
    if (error instanceof Error) {
      console.error(`Error api/user/.ts:`, error.message, error.name);
      statusText = error.message;
    } else {
      console.error(`Error api/user/.ts:`, error);
    }
    // the httpsError function transform the provided data into the expected error form (go to helpers for reference)
    res.status(status).json(httpsError(status, statusText));
  }
}
