// TODO: Backend Integration Pending
// Replace mock logic with real API calls when backend is ready

export const authService = {
  login: async (_email: string, _password: string) => {
    // TODO: Backend Integration Pending
    // return api.post('/auth/login', { email, password });
    throw new Error('Not implemented - using AuthContext mock');
  },

  logout: async () => {
    // TODO: Backend Integration Pending
    // return api.post('/auth/logout');
  },

  getProfile: async () => {
    // TODO: Backend Integration Pending
    // return api.get('/auth/profile');
  },
};
