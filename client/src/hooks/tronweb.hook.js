import { useCallback, useState } from "react";
import { useSelector } from "react-redux";

const useTronWeb = () => {
  const [error, setError] = useState(null);
  const me = useSelector(({ me }) => me);

  const checkError = useCallback(() => {
    try {
      if (!window.tronWeb) throw new Error("Please, install TronLink!");
      if (!window.tronWeb.ready) throw new Error("Please, login TronLink");
      if (!me) throw new Error("Please, authorize");
      if (process.env.NODE_ENV === "production") {
        if (window.tronWeb.fullNode.host !== "https://api.trongrid.io")
          throw new Error("Please, change node to TronGrid");
      } else {
        if (window.tronWeb.fullNode.host !== "https://api.shasta.trongrid.io")
          throw new Error("Please, change node to Shasta TronGrid");
      }
      return false;
    } catch (e) {
      setError(e.message);
      return true;
    }
  }, [me]);

  const buyTicket = useCallback(
    async (address) => {
      try {
        if (checkError()) return;
        const lottery = await window.tronWeb.contract().at(address);
        await lottery.buyTicket().send({
          feeLimit: 30_000_000,
          callValue: await lottery.calculateTrx(1).call(),
        });
        setError("Success!");
      } catch (e) {
        console.log(e);
        setError(e);
      }
    },
    [checkError]
  );

  const clearError = useCallback(() => setError(null), []);

  return { buyTicket, error, clearError };
};

export default useTronWeb;
