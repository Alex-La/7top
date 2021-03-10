import { useCallback, useEffect, useState } from "react";

const useTronWeb = () => {
  const [error, setError] = useState(null);

  const checkError = useCallback(() => {
    try {
      if (!window.tronWeb) throw new Error("Please, install TronLink!");
      if (!window.tronWeb.ready) throw new Error("Please, login TronLink");
      if (process.env.NODE_ENV === "production") {
        if (window.tronWeb.fullNode.host !== "https://api.trongrid.io")
          throw new Error("Please, change node to TronGrid");
      } else {
        if (window.tronWeb.fullNode.host !== "https://api.shasta.trongrid.io")
          throw new Error("Please, change node to Shasta TronGrid");
      }
    } catch (e) {
      setError(e.message);
    }
  }, []);

  const buyTicket = useCallback(
    async (address) => {
      checkError();
      const lottery = await window.tronWeb.contract().at(address);
      await lottery.buyTicket().send({
        feeLimit: 30_000_000,
        callValue: await lottery.calculateTrx(1).call(),
      });
      setError("Success!");
      try {
      } catch (e) {
        setError(e.message);
      }
    },
    [checkError]
  );

  const clearError = useCallback(() => setError(null), []);

  return { buyTicket, error, clearError };
};

export default useTronWeb;
