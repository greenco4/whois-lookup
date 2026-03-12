import {
  pgTable,
  text,
  uuid,
  timestamp,
  smallint,
  integer,
  jsonb,
  boolean,
  index,
} from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

export const domainLookups = pgTable(
  "domain_lookups",
  {
    id: uuid("id")
      .primaryKey()
      .default(sql`gen_random_uuid()`),
    domain: text("domain").notNull(),
    registrar: text("registrar"),
    createdDate: text("created_date"),
    expiresDate: text("expires_date"),
    domainAgeDays: integer("domain_age_days"),
    score: smallint("score").notNull(),
    grade: text("grade").notNull(),
    rdapData: jsonb("rdap_data").notNull(),
    issues: jsonb("issues").notNull(),
    ipHash: text("ip_hash").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  },
  (table) => [
    index("idx_domain_lookups_ip_hash").on(table.ipHash),
    index("idx_domain_lookups_domain").on(table.domain),
  ]
);

export const paidEntitlements = pgTable("paid_entitlements", {
  id: uuid("id")
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  email: text("email").notNull(),
  active: boolean("active").notNull().default(true),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
});
