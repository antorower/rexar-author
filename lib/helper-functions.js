export function stringifyId(obj) {
  if (!obj) return null;
  if (!obj?._id) return obj;

  return {
    ...obj,
    _id: obj._id != null && typeof obj._id !== "string" ? obj._id.toString() : obj._id,
  };
}
