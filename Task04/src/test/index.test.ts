import { calculateScore } from "../utils/utilityfns.js";

describe("Test scoring function", () => {
    it("Calculates score", () => {
        expect(calculateScore()).toBe(0);
    })
})
