// import jsonData from "./data/api.json"; // Adjust the path to your JSON file

export const fetchUserTransactions = async (id) => {
  try {
    const jsonData = await new Promise((resolve) => {
      setTimeout(() => {
        resolve(import(`../data/${id}.json`));
      }, 1000); // Delay
    });

    return jsonData.default;
  } catch (error) {
    console.error(`Error fetching data for ID ${id}:`, error);
    throw error;
  }
};
