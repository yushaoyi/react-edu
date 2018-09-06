import Util from 'util';

class LoginSev {

  // async register (params = {}) {
  //   try {
  //     let result = await Util.postServer('/auth/register', params)
  //     return result
  //   } catch (err) {
  //     throw err;
  //   }
  // }

  register (params = {}) {
    return Util.postServer('/api/register', {
      userName: 'test-react',
      password: '123456',
      phone: '19892009111'
    })
  }
}

export default new LoginSev()