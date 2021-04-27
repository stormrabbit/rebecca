import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Endpoints } from '../../entities/Endpoints';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateEndpointDto } from './dto/create.dto';
import { UpdateEndpointDto } from './dto/update.dto';
import { VerifyDTO } from '../assignments/dto/verify.dot';
@Injectable()
export class EndpointsService {
  constructor(
    @InjectRepository(Endpoints)
    private readonly endpointsRepostory: Repository<Endpoints>,
  ) {}

  async createEndpoint(createDto: CreateEndpointDto): Promise<Endpoints> {
    return await this.endpointsRepostory.save(createDto);
  }

  async retrieveByUrlAndMethod(verifyDto: VerifyDTO): Promise<Endpoints> {
    return this.endpointsRepostory.findOne({
      where: {
        status: 0,
        url: verifyDto.url,
      },
    });
  }

  async retrieveList(): Promise<Endpoints[]> {
    return await this.endpointsRepostory.query(
      ' select * from endpoints where status <> 1',
    );
  }

  async retrieveById(id: number): Promise<Endpoints> {
    return await this.endpointsRepostory.findOne(id);
  }

  async retrieveByName(name: string): Promise<Endpoints> {
    return await this.endpointsRepostory.query(
      `select * from endpoints where name ='${name}'`,
    );
  }

  async updateEndpointById(
    id: number,
    updateDto: UpdateEndpointDto,
  ): Promise<any> {
    try {
      await this.endpointsRepostory.update(id, updateDto);
      return { result: '修改成功' };
    } catch (error) {
      return { result: `${error}` };
    }
  }

  async deleteEndpointById(id: number) {
    const Endpoint = await this.retrieveById(id);
    Endpoint.status = 1;
    try {
      await this.endpointsRepostory.update(id, Endpoint);
      return { result: '删除成功' };
    } catch (error) {
      return { result: `${error}` };
    }
  }
}
