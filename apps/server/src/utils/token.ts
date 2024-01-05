export const setTokensCookie = (
  res,
  tokens: { accessToken: string; refreshToken: string },
) => {
  setAccessTokenCookie(res, tokens.accessToken);
  setRefreshTokenCookie(res, tokens.refreshToken);
};

export const setAccessTokenCookie = (res, accessToken: string) => {
  res.cookie('access_token', accessToken, {
    httpOnly: true,
    maxAge: 1000 * 60 * 60,
  });
};

export const setRefreshTokenCookie = (res, refreshToken: string) => {
  res.cookie('refresh_token', refreshToken, {
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24 * 30,
  });
};

export const resetTokensCookie = (res) => {
  res.cookie('access_token', '', {
    httpOnly: true,
    maxAge: 0,
  });
  res.cookie('refresh_token', '', {
    httpOnly: true,
    maxAge: 0,
  });
};
