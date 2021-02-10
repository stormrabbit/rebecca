import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("role_authority_relations", { schema: "rebecca" })
export class RoleAuthorityRelations extends BaseEntity {
  @PrimaryGeneratedColumn({ type: "int", name: "id", unsigned: true })
  id: number;

  @Column("int", { name: "role_id", unsigned: true })
  roleId: number;

  @Column("int", { name: "authority_id", unsigned: true })
  authorityId: number;

  @Column("tinyint", { name: "status", default: () => "'0'" })
  status: number;
}
