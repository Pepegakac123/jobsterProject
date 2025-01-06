import "@testing-library/jest-dom";
import { afterEach } from "vitest";
import { cleanup } from "@testing-library/react";

// automatyczne czyszczenie po każdym teście
afterEach(() => {
	cleanup();
});
