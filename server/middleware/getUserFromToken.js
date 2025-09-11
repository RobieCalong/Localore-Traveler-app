import { getUserById } from "#db/queries/users";
import { verifyToken } from "#utils/jwt";

/** Attaches the user to the request if a valid token is provided */
export default async function getUserFromToken(req, res, next) {
  const authorization = req.get("authorization");
  // console.log("Authorization header:", authorization);
  if (!authorization || !authorization.startsWith("Bearer ")) {
    // No token provided, just continue
    return next();
  }

  const token = authorization.split(" ")[1];
  try {
    const { id } = await verifyToken(token);
    // console.log("i think this user-id: ", id);
    const user = await getUserById(id);
    // console.log("at getUserFromToken user is: ", user);
    req.user = user;
    next();
  } catch (e) {
    console.error(e);
    // Only send 401 if a token was provided but is invalid
    res.status(401).send("Invalid token.");
  }
}
