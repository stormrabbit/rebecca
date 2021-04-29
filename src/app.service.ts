import { HttpService, Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  constructor(private httpService: HttpService) {}
  getHello(): string {
    return 'Hello World!2';
  }

  async getConfig() {
    const requestConfig = () =>
      new Promise((res, rej) => {
        try {
          this.httpService
            .get('http://angrykitty.link:40439/v1/events')
            .subscribe((response) => {
              console.log(response.data);
              res(response.data.data);
            });
        } catch (error) {
          rej(error);
        }
      });
    return await requestConfig();
  }
}
