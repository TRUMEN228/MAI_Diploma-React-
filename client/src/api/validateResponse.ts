import { AxiosResponse } from "axios";

export async function validateResponse(response: Response): Promise<Response> {
  if (!response.ok) {
    throw new Error(await response.text());
  }

  return response;
}

export async function validateAxiosResponse(response: AxiosResponse): Promise<AxiosResponse> {
  if (response.status !== 200) {
    throw new Error(await response.data);
  }

  return response;
}