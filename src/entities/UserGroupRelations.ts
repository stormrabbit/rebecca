import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('user_group_relations', { schema: 'rebecca' })
export class UserGroupRelations extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id', unsigned: true })
  id: number;

  @Column('int', { name: 'user_id', unsigned: true })
  userId: number;

  @Column('int', { name: 'group_id', unsigned: true })
  groupId: number;

  @Column('tinyint', { name: 'status', default: () => "'0'" })
  status: number;
}
