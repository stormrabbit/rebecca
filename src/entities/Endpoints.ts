import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('endpoints', { schema: 'rebecca' })
export class Endpoints extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id', unsigned: true })
  id: number;

  @Column('varchar', { name: 'name', length: 50 })
  name: string;

  @Column('varchar', { name: 'methods', length: 50 })
  methods: string;

  @Column('varchar', { name: 'description', nullable: true, length: 100 })
  description: string | null;

  @Column('varchar', { name: 'url', length: 100 })
  url: string;

  @Column('int', { name: 'parent_id', nullable: true, unsigned: true })
  parentId: number | null;

  @Column('tinyint', { name: 'status', default: () => "'0'" })
  status: number;
}
