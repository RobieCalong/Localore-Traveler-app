const BASE_URL = `http://localhost:3000`;

export async function fetchAllLocations() {
  try {
    const res = await fetch(`${BASE_URL}/location`);

    if (!res.ok) throw new Error("Locations not found");

    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error.message);
  }
}
