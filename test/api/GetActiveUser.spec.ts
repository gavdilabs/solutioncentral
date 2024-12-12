import cds from "@sap/cds";
import { expect } from "chai";
import { dummyUser } from "../users";

const baseUrl = "/odata/v4/radar/getActiveUser()";

describe("getActiveUser API Tests", () => {
  const test = cds.test(`${__dirname}/../..`);

  it("Should not be possible for unauthenticated users to send a request", async () => {
    const err = await test.GET(baseUrl).catch((e) => e);

    expect(err).to.not.be.undefined;
    expect(err.response).to.not.be.undefined;
    expect(err.response.status).to.equal(401);
  });

  it("Should return user 'dummy' when logged in as that user", async () => {
    const res = await test.GET(baseUrl, dummyUser);

    expect(res).to.not.be.undefined;
    expect(res.status).to.equal(200);
    expect(res.data).to.not.be.undefined;
    expect(res.data.username).to.equal(dummyUser.auth.username);
  });

  it("Should return 404 if the user does not exist in the system", async () => {
    const err = await test
      .GET(baseUrl, {
        auth: {
          username: "invalid",
          password: "invalid",
        },
      })
      .catch((e) => e);

    expect(err).to.not.be.undefined;
    expect(err.response).to.not.be.undefined;
    expect(err.response.status).to.equal(404);
  });
});
