const supertest = require("supertest");
const app = require("../src/app");
const request = supertest(app);

test("request with right x-signature header is accepted", async () => {
  const result = await request
    .post("/order-completed")
    .set({
      "x-signature":
        "b64f898b6420bfe4a17a2278ae1cdd818fc172fbce6c4292c4666660a04646e0",
      "content-type": "application/json",
    })
    .send(testOrderData);
  expect(result.status).toBe(200);
});

test("request with wrong x-signature header is rejected", async () => {
  const result = await request
    .post("/order-completed")
    .set({
      "x-signature": "wrong-signature-123",
      "content-type": "application/json",
    })
    .send(testOrderData);
  expect(result.status).toBe(400);
});

test("request without x-signature header is accepted", async () => {
  const result = await request
    .post("/order-completed")
    .set({
      "content-type": "application/json",
    })
    .send(testOrderData);
  expect(result.status).toBe(200);
});

const testOrderData = {
  commandClass: "OrderCompletedEventCommand",
  command: {
    status: "COMPLETED",
  },
  tenant: {
    __NAME__: "test",
    defaultLanguage: "pl",
    currency: "EUR",
  },
  order: {
    id: "3916a504-6312-417f-b8ad-17e1ca74f5c1",
    tenant: "8724ef73-20c8-4018-b183-3504cadc38bf",
    closedDate: "2019-08-27T10:47:43",
    lastChanged: "2019-08-27T10:47:43",
    isClosed: true,
    isCompleted: true,
    source: "central",
    users: [
      {
        userId: "7d47b7bc-0bb7-4493-8cd9-aaad630eb02d",
        roles: ["CUSTOMER", "CREATOR"],
        phone: "48123456789",
        email: "example@example.com",
        extra: {},
      },
    ],
    orderType: "TAKE_AWAY",
    total: "13.99",
    editTotal: "13.99",
    status: "COMPLETED",
    statusInfo: "completed",
    claimCode: "YQ0W5O",
    buckets: [
      {
        venue: "2de9a0c3-4b21-407c-83d1-031ea0735eb3",
        sync: false,
        name: "Burger",
        lines: [
          {
            id: "36ca0d9e-8589-42e9-bee3-4f6c49efe95f",
            creator: "2de9a0c3-4b21-407c-83d1-031ea0735eb2",
            created: "2019-08-26T10:47:15",
            updated: "2019-08-26T10:47:22",
            source: "central",
            productName: "Burger",
            quantity: 1,
            price: "13.99",
            productId: "burger1",
            product: {
              id: "burger1",
              kind: "product",
              quantity: 1,
              price: "13.99",
              literals: {
                name: "Burger",
              },
              img: "http://placekitten.com/200/300",
            },
            productConfig: {},
            status: "NEW",
            discounts: [],
            extra: {},
          },
        ],
        queuePos: 3,
        extra: {},
      },
    ],
    payments: [
      {
        id: "100e0b17-bb15-4a3d-aa29-68da05c49677",
        source: "WEB",
        amount: "13.99",
        timestamp: "2019-08-26T10:47:22",
        extra: {},
      },
    ],
    extra: {},
  },
};
