import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("group_role_relations", { schema: "rebecca" })
export class GroupRoleRelations extends BaseEntity {
  @PrimaryGeneratedColumn({ type: "int", name: "id", unsigned: true })
  id: number;

  @Column("int", { name: "group_id", unsigned: true })
  groupId: number;

  @Column("int", { name: "role_id", unsigned: true })
  roleId: number;

  @Column("tinyint", { name: "status", default: () => "'0'" })
  status: number;
}
