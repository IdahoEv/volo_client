// import sinon from 'sinon';

import MessageRouter from "MessageRouter";

console.log(MessageRouter);

describe("Passing messages to registered callbacks", () => {
  it("passes messages to a callback registered for that key", () => {
    var router = new MessageRouter();
    var listener = sinon.spy();
    var message = { foo: 1};

    router.subscribe("foo", listener);
    router.handle(message);
    expect(listener).to.have.been.calledWith(message);
  });

  it("doesn't pass non-matching messages to a callback", () => {
    var router = new MessageRouter();
    var listener = sinon.spy();
    var message = { foo: 1};

    router.subscribe("bar", listener);
    router.handle(message);
    expect(listener).not.to.have.been.called;
  });

});
