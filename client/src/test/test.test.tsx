import App from "../App";
import { render, screen } from "@testing-library/react";

describe("App", () => {
	it("Should render h2 tag", () => {
		render(<App />);
		const element = screen.getByText(/App/i);
		expect(element).toBeInTheDocument();
	});
});
