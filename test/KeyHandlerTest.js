import KeyHandler from "KeyHandler";

describe("hasControlStateChanged", () => {
  it("is true if the states are different", () => {
    let handler = new KeyHandler();
    let cs1 = { 'acceleration': 0, 'rotation': 0, 'trigger': 0 };
    let cs2 = { 'acceleration': 0, 'rotation': -1, 'trigger': 0 };

    expect(handler.hasControlStateChanged(cs1, cs2)).to.eql(true);
  });
  it("is false if the states are identical", () => {
    let handler = new KeyHandler();
    let cs1 = { 'acceleration': 0, 'rotation': -1, 'trigger': 0 };
    let cs2 = { 'acceleration': 0, 'rotation': -1, 'trigger': 0 };

    expect(handler.hasControlStateChanged(cs1, cs2)).to.eql(false);
  });
});  
