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

  it("passes matching messages to multiple callbacks", () => {
    var router = new MessageRouter();
    var listener1 = sinon.spy();
    var listener2 = sinon.spy();
    var message = { foo: 1};

    router.subscribe("foo", listener1);
    router.subscribe("foo", listener2);
    router.handle(message);
    expect(listener1).to.have.been.calledWith(message);
    expect(listener2).to.have.been.calledWith(message);
  });

  it("passes messages correctly after unubscribe", () => {
    var router = new MessageRouter();
    var listener1 = sinon.spy();
    var listener2 = sinon.spy();
    var message = { foo: 1};

    router.subscribe("foo", listener1);
    router.subscribe("foo", listener2);
    router.unsubscribe("foo", listener2);
    router.handle(message);
    expect(listener1).to.have.been.calledWith(message);
    expect(listener2).not.to.have.been.calledWith(message);
  });
  
});
