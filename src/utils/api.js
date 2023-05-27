// import jsonData from "./data/api.json"; // Adjust the path to your JSON file

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

        resolve(sortedData);
      }, 1000); // Delay
    });

    return jsonData;
  } catch (error) {
    console.error(`Error fetching data for ID ${id}:`, error);
    throw error;
  }
};


export const fetchTransactionsGraph = async () => {
  try {
    const jsonData = await new Promise((resolve) => {
      setTimeout(async () => {
        const { default: data } = await import(`../data/sampleTree.json`);
        const processNode = ({ child, transaction_id, transacted_to, transaction_amount }) => {
          if (child == null || child.length == 0) {
            return {
              id: transaction_id,
              value: {
                title: transacted_to,
                items: [
                  {
                    text: "Amount",
                    value: transaction_amount
                  }
                ],
                percent: 0.1
              },
            }
          } else {
            return {
              id: transaction_id,
              value: {
                title: transacted_to,
                items: [
                  {
                    text: "Amount",
                    value: transaction_amount
                  }
                ],
                percent: 0.1
              },
              children: child.map(processNode)
            }
          }

        }

        const res = data.map(processNode)

        resolve(res);
      }, 1000); // Delay
    });

    return jsonData;
  } catch (error) {
    console.error(`Error fetching data:`, error);
    throw error;
  }
};
