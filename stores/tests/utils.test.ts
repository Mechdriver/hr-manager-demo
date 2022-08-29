import { replaceItemAtIndex } from "../utils";

describe('Store utility tests', () => {
  const mockList = [1, 2, 3];

  it('works with an empty list', () => {
    const arr = replaceItemAtIndex([], 0, 4);
    expect(arr[0]).toEqual(4);
  })

  it('inserts into start', () => {
    const arr = replaceItemAtIndex(mockList, 0, 4);
    expect(arr[0]).toEqual(4);
  });

  it("inserts into middle", () => {
    const arr = replaceItemAtIndex(mockList, 1, 4);
    expect(arr[1]).toEqual(4);
  });

  it("inserts into end", () => {
    const arr = replaceItemAtIndex(mockList, 2, 4);
    expect(arr[2]).toEqual(4);
  });
});

export {};
