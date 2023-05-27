// import jsonData from "./data/api.json"; // Adjust the path to your JSON file

const clientMap = {
  1001: "Maybank",
  1002: "TnG E-Wallet",
  1003: "GrabPay",
  1004: "ShopeePay",
  1005: "CIMB",
};

export const fetchUserTransactions = async (id) => {
  try {
    const jsonData = await new Promise((resolve) => {
      setTimeout(async () => {
        const data = await import(`../data/${id}.json`);

        // Sort by desc order
        const sortedData = data.default
          .sort((a, b) => {
            return new Date(b.transaction_date) - new Date(a.transaction_date);
          })
          .map((d) => {
            return {
              ...d,
              client_id: clientMap[d.client_id],
            };
          });

        resolve(sortedData);
      }, 1000); // Delay
    });

    return jsonData;
  } catch (error) {
    console.error(`Error fetching data for ID ${id}:`, error);
    throw error;
  }
};
