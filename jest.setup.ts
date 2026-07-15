// Registers @testing-library/jest-dom matchers (toBeInTheDocument, toHaveAttribute, …)
// for component tests. Harmless for Node-environment tests — importing it
// only extends `expect`; the matchers are simply unused there.
import "@testing-library/jest-dom";
