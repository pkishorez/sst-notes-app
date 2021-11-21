import StorageStack from "./storage-stack";

export default function main(app) {
  // Set default runtime for all functions
  app.setDefaultFunctionProps({
    runtime: "nodejs12.x",
  });

  // Add more stacks
  new StorageStack(app, "storage");
}
