import jwt, { JwtPayload } from "jsonwebtoken";
import config from "./../../config";
import User from "../../schema/user/user.model";
import { Request, Response } from "express";
import { IUserModel } from "../../type/user";
import {
  IAuthenticatedPayload,
  ICreateTokenResult,
  IErrorResponse,
  ILoginRequestBody,
  ILoginResponse,
  IRegisterRequestBody,
} from "../../type/auth";

const { secret, expire } = config.token;

export async function register(
  req: Request<{}, {}, IRegisterRequestBody>,
  res: Response<ILoginResponse | IErrorResponse>
): Promise<void> {
  try {
    const user: any = await User.create(req.body);

    const token = jwt.sign({ email: user.email }, secret, {
      expiresIn: expire,
    });
    res.status(200).json({ user: user.toGraph(), token: token });
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({
        message: "An error occurred during registration",
        error: error.message,
      });
    } else {
      res.status(500).json({ message: "An unknown error occurred" });
    }
  }
}

export async function login(
  req: Request<{}, {}, ILoginRequestBody>,
  res: Response<ILoginResponse | IErrorResponse>
): Promise<void> {
  try {
    const { email, password } = req.body;

    const result = await createToken(email, password);

    if (result) {
      res.status(200).json({ token: result.token, user: result.user });
    } else {
      res.status(403).json({
        message: "Login failed! Invalid credentials :(",
      });
    }
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({
        message: "An error occurred during registration",
        error: error.message,
      });
    } else {
      res.status(500).json({ message: "An unknown error occurred" });
    }
  }
}

export async function verifyToken(req: Request, res: Response): Promise<void> {
  const token = req.headers.authorization;

  try {
    const auth: any = await checkUserAuthenticated(token);

    if (auth.user) {
      res.status(200).json({ data: auth });
    }

    res.status(401).json({ message: "User is not registered yet" });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({
        message: "An error occurred during registration",
        error: error.message,
      });
    } else {
      res.status(500).json({ message: "An unknown error occurred" });
    }
  }
}

async function createToken(
  email: string,
  password: string
): Promise<ICreateTokenResult | null> {
  if (!email || !password) {
    throw new Error("Email and password are required");
  }

  const user: IUserModel | null = await User.findOne({ email });

  if (user && (await user.comparePassword(password))) {
    const token = jwt.sign({ email: user.email }, secret, {
      expiresIn: expire,
    });
    return { token, user: user.toGraph() };
  }

  return null;
}

export async function checkUserAuthenticated(
  token: string | undefined
): Promise<{ user: any; expiresAt: number | undefined }> {
  if (!token) {
    throw new Error("No token provided on headers");
  }

  const [prefix, payload] = token.split(" ");

  if (prefix !== "Bearer") {
    throw new Error("Invalid authorization format");
  }

  if (!payload) {
    throw new Error("No token provided on headers");
  }
  return new Promise((resolve, reject) => {
    jwt.verify(payload, secret, async (error, data) => {
      if (error) {
        throw new Error("Invalid token!");
      } else if (!data) {
        throw new Error("User does not exist");
      }
      try {
        const user: any = await User.findOne(
          { email: (data as IAuthenticatedPayload).email },
          "-password -__v"
        );

        if (!user) {
          reject(new Error("User not found"));
        }
        resolve({ user, expiresAt: (data as JwtPayload).exp });
      } catch (err) {
        reject(err);
      }
    });
  });
}
