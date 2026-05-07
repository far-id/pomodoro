import { relations } from "drizzle-orm";
import { pgTable, text, timestamp, integer, uuid, smallint, boolean, index, pgEnum } from "drizzle-orm/pg-core";

// ─────────────────────────────────────────────
// ENUMS

export const sessionTypeEnum = pgEnum("session_type", [
  "pomodoro",
  "short_break",
  "long_break",
])

export const sessionStatusEnum = pgEnum("session_status", [
  "completed",
  "interrupted",
  "skipped",
])

export const taskStatusEnum = pgEnum("task_status", [
  "todo",        // not started yet
  "focusing",    // currently being worked on
  "completed",
])

// ─────────────────────────────────────────────
// TABLES

export const user = pgTable('user', {
	id: text('id').primaryKey(),
	name: text('name').notNull(),
	email: text('email').notNull().unique(),
	emailVerified: boolean('email_verified').default(false).notNull(),
	image: text('image'),
	createdAt: timestamp('created_at').defaultNow().notNull(),
	updatedAt: timestamp('updated_at')
		.defaultNow()
		.$onUpdate(() => /* @__PURE__ */ new Date())
		.notNull(),
});

export const session = pgTable(
  "session",
  {
    id: text("id").primaryKey(),
    expiresAt: timestamp("expires_at").notNull(),
    token: text("token").notNull().unique(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .$onUpdate(() => /* @__PURE__ */ new Date())
      .notNull(),
    ipAddress: text("ip_address"),
    userAgent: text("user_agent"),
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
  },
  (table) => [index("session_userId_idx").on(table.userId)],
);

export const account = pgTable(
  "account",
  {
    id: text("id").primaryKey(),
    accountId: text("account_id").notNull(),
    providerId: text("provider_id").notNull(),
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    accessToken: text("access_token"),
    refreshToken: text("refresh_token"),
    idToken: text("id_token"),
    accessTokenExpiresAt: timestamp("access_token_expires_at"),
    refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),
    scope: text("scope"),
    password: text("password"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .$onUpdate(() => /* @__PURE__ */ new Date())
      .notNull(),
  },
  (table) => [index("account_userId_idx").on(table.userId)],
);

export const verification = pgTable(
  "verification",
  {
    id: text("id").primaryKey(),
    identifier: text("identifier").notNull(),
    value: text("value").notNull(),
    expiresAt: timestamp("expires_at").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .defaultNow()
      .$onUpdate(() => /* @__PURE__ */ new Date())
      .notNull(),
  },
  (table) => [index("verification_identifier_idx").on(table.identifier)],
);

// ─────────────────────────────────────────────

export const userSettings = pgTable("user_settings", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: text("user_id")
    .notNull()
    .unique()
    .references(() => user.id, { onDelete: "cascade" }),

  // Timer Durations (in minutes)
  pomodoroDuration: smallint("pomodoro_duration").notNull().default(25),
  shortBreakDuration: smallint("short_break_duration").notNull().default(5),
  longBreakDuration: smallint("long_break_duration").notNull().default(15),

  // Automation toggle
  autoStartBreaks: boolean("auto_start_breaks").notNull().default(false),
  autoStartPomodoros: boolean("auto_start_pomodoros").notNull().default(false),

  soundNotification: boolean("sound_notification").notNull().default(true),
  browserNotification: boolean("browser_notification").notNull().default(true),
  longBreakInterval: smallint("long_break_interval").notNull().default(4),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
})

// ─────────────────────────────────────────────

export const projects = pgTable("projects", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  name: text("name").notNull(),
  color: text("color").notNull().default("#C1440E"), // hex, for label/icon color
  description: text("description"),
  isFavorite: boolean("is_favorite").notNull().default(false),
  isArchived: boolean("is_archived").notNull().default(false),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
})

// ─────────────────────────────────────────────

export const tasks = pgTable("tasks", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  projectId: uuid("project_id")
    .references(() => projects.id, { onDelete: "set null" }),  // task could be without project

  title: text("title").notNull(),
  notes: text("notes"),
  status: taskStatusEnum("status").notNull().default("todo"),

  // Pomodoro tracking
  estimatedPomodoros: smallint("estimated_pomodoros").notNull().default(1),
  completedPomodoros: smallint("completed_pomodoros").notNull().default(0),

  // Ordering on list (drag & drop)
  sortOrder: integer("sort_order").notNull().default(0),

  // deadline
  dueDate: timestamp("due_date", { withTimezone: true }),

  completedAt: timestamp("completed_at", { withTimezone: true }),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
})

// ─────────────────────────────────────────────

export const pomodoroSessions = pgTable("pomodoro_sessions", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),

  //session can be associated with a task and/or project, but it's optional
  taskId: uuid("task_id")
    .references(() => tasks.id, { onDelete: "set null" }),
  projectId: uuid("project_id")
    .references(() => projects.id, { onDelete: "set null" }),

  type: sessionTypeEnum("type").notNull(),
  status: sessionStatusEnum("status").notNull(),

  // plannedDuration is the intended length of the session (e.g. 25 min for pomodoro), while actualDuration is how long it actually lasted (null if still ongoing)
  plannedDuration: integer("planned_duration").notNull(),  // seconds (e.g. 1500 = 25 min)
  actualDuration: integer("actual_duration"),             // seconds, null if session is still in progress

  startedAt: timestamp("started_at", { withTimezone: true }).notNull(),
  endedAt: timestamp("ended_at", { withTimezone: true }),

  // sequence number for the day, used to track which pomodoro number it is for the user on that day (e.g. 1st, 2nd, 3rd pomodoro of the day)
  dailySequence: smallint("daily_sequence"),

  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
})

// ─────────────────────────────────────────────

export const dailyStats = pgTable("daily_stats", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),

  date: timestamp("date", { withTimezone: true, mode: "date" }).notNull(),

  // metric cards
  totalFocusSeconds: integer("total_focus_seconds").notNull().default(0),
  sessionsCompleted: smallint("sessions_completed").notNull().default(0),
  tasksFinished: smallint("tasks_finished").notNull().default(0),

  // Breakdown of session types for the day
  pomodoroCount: smallint("pomodoro_count").notNull().default(0),
  shortBreakCount: smallint("short_break_count").notNull().default(0),
  longBreakCount: smallint("long_break_count").notNull().default(0),

  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
})

// ─────────────────────────────────────────────

export const streaks = pgTable("streaks", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: text("user_id")
    .notNull()
    .unique()
    .references(() => user.id, { onDelete: "cascade" }),

  currentStreak: smallint("current_streak").notNull().default(0),
  longestStreak: smallint("longest_streak").notNull().default(0),
  lastActiveDate: timestamp("last_active_date", { withTimezone: true, mode: "date" }),

  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
})

// ─────────────────────────────────────────────
// RELATIONS

export const userRelations = relations(user, ({ one, many }) => ({
  sessions: many(session),
  accounts: many(account),
  settings: one(userSettings, { fields: [user.id], references: [userSettings.userId] }),
  streak: one(streaks, { fields: [user.id], references: [streaks.userId] }),
  projects: many(projects),
  tasks: many(tasks),
  pomodoroSessions: many(pomodoroSessions),
  dailyStats: many(dailyStats),
}));

export const sessionRelations = relations(session, ({ one }) => ({
  user: one(user, { fields: [session.userId], references: [user.id], }),
}));

export const accountRelations = relations(account, ({ one }) => ({
  user: one(user, { fields: [account.userId], references: [user.id], }),
}));


export const projectsRelations = relations(projects, ({ one, many }) => ({
  user: one(user, { fields: [projects.userId], references: [user.id] }),
  tasks: many(tasks),
  pomodoroSessions: many(pomodoroSessions),
}))

export const tasksRelations = relations(tasks, ({ one, many }) => ({
  user: one(user, { fields: [tasks.userId], references: [user.id] }),
  project: one(projects, { fields: [tasks.projectId], references: [projects.id] }),
  pomodoroSessions: many(pomodoroSessions),
}))

export const pomodoroSessionsRelations = relations(pomodoroSessions, ({ one }) => ({
  user: one(user, { fields: [pomodoroSessions.userId], references: [user.id] }),
  task: one(tasks, { fields: [pomodoroSessions.taskId], references: [tasks.id] }),
  project: one(projects, { fields: [pomodoroSessions.projectId], references: [projects.id] }),
}))
