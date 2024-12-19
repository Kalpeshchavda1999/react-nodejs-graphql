import mongoose, { Schema, model } from "mongoose";
import { IProject } from "../../type/project"; // Your IProject type

const projectSchema = new Schema<IProject>(
  {
    name: {
      type: String,
      required: true,
    },
    type: {
      type: String,
    },
    clientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Client",
      required: true,
    },
  },
  {
    timestamps: true, // Automatically add createdAt and updatedAt fields
  }
);

// Virtuals and transformation for JSON output
projectSchema.set("toObject", { virtuals: true });
projectSchema.set("toJSON", {
  virtuals: true,
});

// Custom method (if needed)
projectSchema.method("toGraph", function toGraph(this: any) {
  return JSON.parse(JSON.stringify(this));
});

// Create the model from the schema
const Project = model<IProject>("Project", projectSchema);

export default Project;
