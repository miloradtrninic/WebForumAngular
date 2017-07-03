/**
 * Created by komp on 6/25/2017.
 */
export class UserModel {

  constructor(public username: string, public password: string, public role?: string, public name?: string,
              public surname?: string, public phoneNum?: string,
              public email?: string, public registerDate?: string,
              public subscribedSections?: string[], public myThreads?: string[],
              public myComments?: number[]) {
    myComments = [];
    subscribedSections = [];
    myThreads = [];
    role = 'SUBSCRIBER';
  }

}
