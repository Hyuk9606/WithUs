export const API_BASE_URL = 'http://localhost:8080';

export const OAUTH2_REDIRECT_URI = 'http://localhost:3000/oauth2/redirect';

export const GOOGLE_AUTH_URL = API_BASE_URL + '/oauth2/authorization/google?redirect_uri=' + OAUTH2_REDIRECT_URI;
export const FACEBOOK_AUTH_URL = API_BASE_URL + '/oauth2/authorization/facebook?redirect_uri=' + OAUTH2_REDIRECT_URI;
export const NAVER_AUTH_URL = API_BASE_URL + '/oauth2/authorization/naver?redirect_uri=' + OAUTH2_REDIRECT_URI;
export const KAKAO_AUTH_URL = API_BASE_URL + '/oauth2/authorization/kakao?redirect_uri=' + OAUTH2_REDIRECT_URI;


// api/v3/users/ 
// backend url