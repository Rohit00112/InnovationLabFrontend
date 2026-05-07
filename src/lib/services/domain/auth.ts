import {
  bffApi,
  type AuthSessionResponse,
  type LoginRequestDto,
  type TokenRequestDto,
} from "@/lib/services/bff-client";

export async function login(
  body: LoginRequestDto,
): Promise<AuthSessionResponse> {
  const response = await bffApi.auth.login(body);
  return response.data ?? { authenticated: true };
}

export async function refreshToken(
  body: TokenRequestDto,
): Promise<AuthSessionResponse> {
  const response = await bffApi.auth.refreshToken(body);
  return response.data ?? { authenticated: true };
}

export async function logout(): Promise<AuthSessionResponse> {
  const response = await bffApi.auth.logout();
  return response.data ?? { authenticated: false };
}
