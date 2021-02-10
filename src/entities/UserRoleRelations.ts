import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('user_role_relations', { schema: 'rebecca' })
export class UserRoleRelations extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id', unsigned: true })
  id: number;

  @Column('int', { name: 'user_id', unsigned: true })
  userId: number;

  @Column('int', { name: 'role_id', unsigned: true })
  roleId: number;

  @Column('tinyint', { name: 'status', default: () => "'0'" })
  status: number;
}
