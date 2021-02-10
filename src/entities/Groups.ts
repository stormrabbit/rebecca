import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('groups', { schema: 'rebecca' })
export class Groups extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id', unsigned: true })
  id: number;

  @Column('varchar', { name: 'name', length: 50 })
  name: string;

  @Column('int', { name: 'parent_id', nullable: true, unsigned: true })
  parentId: number | null;

  @Column('tinyint', { name: 'status', default: () => "'0'" })
  status: number;
}
