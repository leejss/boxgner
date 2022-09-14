const { getFileExtension } = require("./utils");

test("getFileExtension test", () => {
  expect(getFileExtension("Button.stories.tsx")).toBe("stories.tsx");
  expect(getFileExtension("Button.module.css")).toBe("module.css");
});
