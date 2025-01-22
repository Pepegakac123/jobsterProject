import { Landing } from "@/pages";
import { cleanup, logRoles, render, screen } from "@testing-library/react";
import { userEvent, type UserEvent } from "@testing-library/user-event";
import { createMemoryRouter, MemoryRouter } from "react-router-dom";
import { routes } from "@/routes";
import { RouterProvider } from "react-router";

describe("Landing Page", () => {
	let user: UserEvent;

	beforeAll(() => {
		const { container } = render(
			<MemoryRouter>
				<Landing />
			</MemoryRouter>,
		);
		screen.debug();
		logRoles(container);
		cleanup();
	});

	// Grupa testów dla renderowania komponentów
	describe("Component Rendering", () => {
		beforeEach(() => {
			user = userEvent.setup();
			render(
				<MemoryRouter>
					<Landing />
				</MemoryRouter>,
			);
		});

		it("Should render h1 tag", () => {
			const h1 = screen.getByRole("heading", { name: /job tracking app/i });
			expect(h1).toBeInTheDocument();
		});

		it("Should render paragrpah tag", () => {
			const p = screen.getByText(
				/Effortlessly manage job applications with our tracking app. Stay organized, track progress, set reminders, and land your dream job!/i,
			);
			expect(p).toBeInTheDocument();
		});

		it("Should render logo element", () => {
			const logo = screen.getByAltText(/jobify/i);
			expect(logo).toBeInTheDocument();
		});

		it("Should render image element", () => {
			const img = screen.getByAltText(
				/Illustration of a person analyzing his personal goals/i,
			);
			expect(img).toBeInTheDocument();
		});

		it("Should render button element", () => {
			const btn = screen.getByRole("button", { name: /login\/register/i });
			expect(btn).toBeInTheDocument();
		});
	});

	// Osobna grupa testów dla nawigacji
	describe("Navigation", () => {
		it("Should navigate user to register page", async () => {
			user = userEvent.setup();

			const router = createMemoryRouter(routes, {
				initialEntries: ["/"],
				initialIndex: 0,
			});

			render(<RouterProvider router={router} />);

			const btn = screen.getByRole("button", { name: /login\/register/i });
			await user.click(btn);

			expect(router.state.location.pathname).toBe("/register");
		});
	});
});
