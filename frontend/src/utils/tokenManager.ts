export const tokenManager = {
  getAccessToken: () => localStorage.getItem('accessToken'),
  setAccessToken: (token: string) => localStorage.setItem('accessToken', token),
  removeAccessToken: () => localStorage.removeItem('accessToken'),
};
