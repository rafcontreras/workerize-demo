import sha256 from "js-sha256";

export const sha = async ({ value }) => {
  const result = sha256(value + "my-awesome-salt");
  const data = { value, result };
  const message = { data };

  return JSON.stringify(message);
};
