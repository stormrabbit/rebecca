import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users', { schema: 'rebecca' })
export class Users extends BaseEntity {
  static fromObject(obj: Users | any): Users {
    if (obj instanceof Users) {
      return obj;
    }
    const _obj: any = Object.values(JSON.parse(JSON.stringify(obj)))[0];
    try {
      const { id, name, pwd, status = '1' } = _obj;
      const user = new Users();
      user.id = id;
      user.name = name;
      user.pwd = pwd;
      user.status = status;
      return user;
    } catch (error) {
      console.log(error);
    }
    return null;
  }
  @PrimaryGeneratedColumn({ type: 'int', name: 'id', unsigned: true })
  id: number;

  @Column('varchar', { name: 'name', length: 40 })
  name: string;

  @Column('tinyint', { name: 'status', default: () => "'0'" })
  status: number;

  @Column('varchar', { name: 'pwd' })
  pwd: string;
}
