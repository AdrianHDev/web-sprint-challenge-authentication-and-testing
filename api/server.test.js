const db = require("../data/dbConfig");
const server = require("./server");
const request = require("supertest");
const bcrypt = require("bcryptjs");

// Write your tests here

const user1 = { username: "user", password: "pass1234" };

test("sanity", () => {
  expect(true).toBe(true);
});

beforeAll(async () => {
  await db.migrate.rollback();
  await db.migrate.latest();
});
beforeEach(async () => {
  await db("users").truncate();
});

afterAll(async () => {
  await db.destroy();
});
describe("Verify Endpoints are working", () => {
  it("[POST] /api/auth/register creates new User", async () => {
    const newUser = await request(server)
      .post("/api/auth/register")
      .send(user1)
      .expect(201)
      .then((res) => res.body);
    const user = await db("users").where({ id: newUser.id }).first();
    expect(user);
  });
  it("[POST] /api/auth/register updates database", async () => {
    const newUser = await request(server)
      .post("/api/auth/register")
      .send(user1)
      .expect(201)
      .then((res) => res.body);
    const user = await db("users").where({ id: newUser.id }).first();
    expect(bcrypt.compareSync(user1.password, user.password)).toBe(true);
    expect(user.username).toBe(user1.username);
  });
});
