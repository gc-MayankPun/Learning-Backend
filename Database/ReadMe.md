# 🧠 1. Database Relationships

| Type                           | Description                               | Example                          |
| ------------------------------ | ----------------------------------------- | -------------------------------- |
| 🧍‍♂️ One to One                  | One record is linked to exactly one other | 1 User → 1 Profile               |
| 🧍‍♂️📄 One to Many / Many to One | One record relates to many others         | 1 Post → many Comments           |
| 👥👥 Many to Many              | Many records linked with many records     | Many Students → Many Courses     |
| 🌀 Polymorphic                 | One record linked to multiple models      | Comment → Post or Video or Image |

&nbsp;

# 🧠 2. What are Data Types in MongoDB?

| MongoDB Type | Description                   |
| ------------ | ----------------------------- |
| String       | Text                          |
| Number       | Integer or Float              |
| Boolean      | `true` or `false`             |
| Date         | Date object                   |
| Array        | List of values                |
| ObjectId     | Reference to another document |
| Object       | Embedded documents            |
| Buffer       | Binary data (e.g., images)    |

&nbsp;

# 🧠 3. NoSQL vs SQL

| Feature        | SQL (MySQL, PostgreSQL)       | NoSQL (MongoDB, etc.)         |
| -------------- | ----------------------------- | ----------------------------- |
| Structure      | Tables, Rows, Columns         | Collections, Documents (JSON) |
| Schema         | Fixed (strict schema)         | Flexible (dynamic schema)     |
| Relations      | Strong relational support     | Manual/weak relations         |
| Queries        | SQL language (`SELECT`)       | JavaScript-like (`find()`)    |
| Use Case       | Complex relations, structured | Fast, scalable, flexible data |
| Example Record | Row in a table                | JSON document                 |

&nbsp;

# ✅ Quick Analogy

| SQL               | NoSQL                  |
| ----------------- | ---------------------- |
| Excel spreadsheet | Folder with JSON files |
| Table = Sheet     | Collection = Folder    |
| Row = Record      | Document = JSON file   |
