import { Schema, model } from "mongoose";
import { IClient } from "../../type/client";

const clientSchema = new Schema<IClient>(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

clientSchema.set("toObject", { virtuals: true });
clientSchema.set("toJSON", { virtuals: true });

clientSchema.method("toGraph", function toGraph(this: any) {
  return JSON.parse(JSON.stringify(this));
});

const Client = model<IClient>("Client", clientSchema);

export default Client;
